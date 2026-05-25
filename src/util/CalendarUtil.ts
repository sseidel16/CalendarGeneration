// @ts-ignore: uxp types not available
import { ColorSpace } from "indesign";
import { CalendarData, CalendarScriptSettings, DateBox, NoteBox } from "../data/calendar";

export class CalendarUtils {
    private labelMap: Map<string, any> = new Map();
    private _gridBoundsCache: any[] | null = null;
    private _settings: CalendarScriptSettings | null = null;
    public doc: any = null;

    constructor() { }

    private getSettings(): CalendarScriptSettings {
        return this._settings || {
            duplicationPreference: "replace",
            headerTemplatePageIndex: 0,
            gridTemplatePageIndex: 1,
            monthsStartPageIndex: 3,
            verticalGridSpacing: 0.1,
            horizontalGridSpacing: 0,
            gridDividerWeight: "1pt",
            gridDividerColor: [0, 0, 0]
        };
    }

    /**
     * Build the label map from the document
     */
    public initialize(doc: any) {
        this.doc = doc;
        this.labelMap.clear();
        this._gridBoundsCache = null;
        let collisions = 0;

        if (this.doc && this.doc.pageItems) {
            const allItems = this.doc.pageItems.everyItem().getElements();
            console.log(`Building label map from ${allItems.length} items...`);

            for (const item of allItems) {
                try {
                    if (this.getTemplateLabel(item) || this.getDuplicateLabel(item)) {
                        const lbl = item.label;
                        if (!this.labelMap.has(lbl)) {
                            this.labelMap.set(lbl, item);
                        } else {
                            collisions++;
                            console.log(`Label collision: ${lbl}`);
                        }
                    }
                } catch (e) {
                    // ignore
                }
            }
        }
        console.log(`Label map built with ${this.labelMap.size} items`);
    }

    public setSettings(settings: CalendarScriptSettings) {
        this._settings = settings;
    }

    /**
     *Clean all duplicate items from the calendar
     */
    public async cleanCalendar(
        progressCallback?: (pct: number) => Promise<void>,
    ) {
        if (!this.doc) {
            console.error("CalendarUtils not initialized with a document");
            return;
        }

        // Ensure settings are set, or default them if you prefer, 
        // essentially we rely on setSettings being called or existing defaults.

        let removedCount = 0;
        const keys = Array.from(this.labelMap.keys());
        const totalItems = keys.length;
        let processed = 0;

        for (const label of keys) {
            const item = this.labelMap.get(label);
            if (item && this.getDuplicateLabel(item)) {
                try {
                    item.remove();
                    this.labelMap.delete(label);
                    removedCount++;
                } catch (e: any) {
                    console.error(`Error removing duplicate '${label}': ${e.message}`);
                }
            }
            processed++;
            if (progressCallback) {
                await progressCallback(Math.min(99, (processed / totalItems) * 100));
            }
        }
        console.log(`Removed ${removedCount} duplicate items`);
    }

    /**
     * Generate the calendar
     */
    public async generateCalendar(
        calendarData: CalendarData,
        progressCallback?: (pct: number) => Promise<void>,
    ) {
        if (!this.doc) {
            console.error("CalendarUtils not initialized with a document");
            return;
        }

        // We assume initialize() has been called if doc is set.
        if (this.labelMap.size === 0) {
            console.log("Label map empty, re-initializing...");
            this.initialize(this.doc);
        }

        const settings = this.getSettings();
        const headerTemplatePage = this.doc.pages.item(settings.headerTemplatePageIndex);
        const gridTemplatePage = this.doc.pages.item(settings.gridTemplatePageIndex);

        const commonHeaderItems = headerTemplatePage.pageItems.everyItem().getElements();
        const commonGridItems = gridTemplatePage.pageItems.everyItem().getElements();

        const year = calendarData.year;
        const months = calendarData.months;

        for (let month = 0; month < months.length; month++) {
            var monthData = months[month];
            var gridData = monthData.grid;

            console.log(`Processing month ${month + 1} of year ${year}`);

            // PROCESS HEADER PAGE

            // duplicate common header items
            for (const item of commonHeaderItems) {
                if (item.itemLayer.name === 'auto_common') {
                    this.duplicateToMonthPage(item, month, false);
                }
            }
            this.processHeaderMonth(monthData, month, year);

            // PROCESS GRID PAGE

            // duplicate common grid items
            for (const item of commonGridItems) {
                if (item.itemLayer.name === 'auto_common') {
                    this.duplicateToMonthPage(item, month, true);
                }
            }

            // iterate through gridData
            for (let row = 0; row < gridData.length; row++) {
                for (let col = 0; col < gridData[row].length; col++) {
                    const cell = gridData[row][col];

                    // DIVIDERS
                    if (settings.horizontalGridSpacing === 0 && col < gridData[row].length - 1) {
                        const nextCell = gridData[row][col + 1];
                        if (cell.type !== "EMPTY" || nextCell.type !== "EMPTY") {
                            this.drawDividerVLine(month, row, col);
                        }
                    }

                    // CELL PROCESSING
                    switch (cell.type) {
                        case "EMPTY":
                            break;
                        case "NOTE":
                            this.processNote(cell, month, row, col);
                            break;
                        case "DATE":
                            this.processCellDate(cell, month, row, col, false);
                            break;
                        case "SPLIT":
                            if (cell.top && cell.top.type === "DATE") {
                                this.processCellDate(cell.top, month, 4, col, true);
                            }
                            this.drawDividerHLine(month, 4, col);
                            if (cell.bottom && cell.bottom.type === "DATE") {
                                this.processCellDate(cell.bottom, month, 5, col, true);
                            }
                            break;
                    }
                    if (progressCallback) {
                        await progressCallback(Math.min(99, (((month * 5 * 7) + (row * 7) + col) / (12 * 7 * 5)) * 100));
                    }
                }
            }
        }
    }


    /* PRIVATE HELPERS */

    private processHeaderMonth(monthData: any, monthIndex: number, year: string) {
        // Use a single combined header textbox and apply paragraph and character styles
        const monthNameEng = monthData.name[0] || "-";
        const monthNameGr = monthData.name[1] || "-";
        const paddedYear = ` ${year} `; // add spaces for better character styling
        const headerText = `${monthNameEng}${paddedYear}${monthNameGr}`;
        const headerLabel = "template:header:month";
        if (this.labelMap.has(headerLabel)) {
            const headerFrame = this.duplicateToMonthPage(this.labelMap.get(headerLabel), monthIndex, false);
            if (headerFrame) {
                headerFrame.contents = headerText;
                try {
                    headerFrame.characters
                        .everyItem()
                        .getElements()
                        .forEach((character: any, index: number) => {
                            character.appliedCharacterStyle =
                                this.doc.characterStyles.itemByName("[None]");
                        });

                    // Apply the paragraph style to the whole story
                    headerFrame.paragraphs
                        .everyItem()
                        .getElements()
                        .forEach((paragraph: any, index: number) => {
                            paragraph.appliedParagraphStyle =
                                this.doc.paragraphStyles.itemByName("auto:text:header:month");
                        });

                    // English month (character style)
                    const engStart = 0;
                    const engEnd = engStart + monthNameEng.length;
                    headerFrame.characters
                        .itemByRange(engStart, engEnd - 1)
                        .appliedCharacterStyle = this.doc.characterStyles.itemByName("auto:char:header:eng:month");

                    // Year (character style)
                    const yearStart = monthNameEng.length;
                    const yearEnd = yearStart + paddedYear.length;
                    headerFrame.characters
                        .itemByRange(yearStart, yearEnd - 1)
                        .appliedCharacterStyle = this.doc.characterStyles.itemByName("auto:char:header:year");

                    // Greek month (character style)
                    const grStart = yearEnd;
                    const grEnd = grStart + monthNameGr.length;
                    headerFrame.characters
                        .itemByRange(grStart, grEnd - 1)
                        .appliedCharacterStyle = this.doc.characterStyles.itemByName("auto:char:header:gr:month");
                } catch (e) {
                    console.log("Warning: Could not apply header paragraph/character styles");
                }
            }
        }
    }

    private getGridGeometricBounds() {
        if (this._gridBoundsCache !== null) {
            return this._gridBoundsCache;
        }
        const gridFrame = this.labelMap.get("template:grid");
        if (!gridFrame) {
            return null;
        }
        this._gridBoundsCache = gridFrame.geometricBounds; // [top, left, bottom, right]
        return this._gridBoundsCache;
    }

    private getTemplateLabel(item: any): string | null {
        if (item && typeof item.label === 'string' && item.label.indexOf('template:') === 0) {
            return item.label.substring(9);
        }
        return null;
    }

    private getDuplicateLabel(item: any): string | null {
        if (item && typeof item.label === 'string' && item.label.indexOf('duplicate:') === 0) {
            return item.label.substring(10);
        }
        return null;
    }

    private getDuplicationPreference(label: string): "skip" | "replace" {
        if (this._settings) {
            return this._settings.duplicationPreference;
        }
        return "replace";
    }

    private duplicateToDateBox(item: any, monthIndex: number, rowIndex: number, colIndex: number, isHalfCell: boolean) {
        const templateLabel = this.getTemplateLabel(item);
        if (!templateLabel) {
            console.error(`Error: Item with label '${item.label}' is not a valid template label`);
            return null;
        }

        const frameBounds = this.getGridGeometricBounds();
        if (!frameBounds) {
            console.error("Error: Could not find template:grid in label map");
            return null;
        }

        const settings = this.getSettings();
        const [frameTop, frameLeft, frameBottom, frameRight] = frameBounds;
        const frameWidth = frameRight - frameLeft;
        const frameHeight = frameBottom - frameTop;

        const cellWidth = (frameWidth - 6 * settings.horizontalGridSpacing) / 7;
        const cellHeight = (frameHeight - 4 * settings.verticalGridSpacing) / 5;

        const templateBounds = item.geometricBounds;
        const [templateTop, templateLeft, templateBottom, templateRight] = templateBounds;

        const templateCenterX = (templateLeft + templateRight) / 2;
        const templateCenterY = (templateTop + templateBottom) / 2;

        const templateCellCol = Math.floor((templateCenterX - frameLeft) / (cellWidth + settings.horizontalGridSpacing));
        const templateCellRow = Math.floor((templateCenterY - frameTop) / (cellHeight + settings.verticalGridSpacing));

        let templateCellLeft = frameLeft + templateCellCol * (cellWidth + settings.horizontalGridSpacing);
        let templateCellTop = frameTop + templateCellRow * (cellHeight + settings.verticalGridSpacing);

        const isTopHalfTemplate = (isHalfCell && (templateCenterY - templateCellTop) < cellHeight / 2);
        if (isHalfCell && !isTopHalfTemplate) {
            templateCellTop += cellHeight / 2;
        }

        const offsetX = templateLeft - templateCellLeft;
        const offsetY = templateTop - templateCellTop;

        const targetCellLeft = frameLeft + colIndex * (cellWidth + settings.horizontalGridSpacing);
        const actualTargetRow = isHalfCell ? 4 : rowIndex;
        let targetCellTop = frameTop + actualTargetRow * (cellHeight + settings.verticalGridSpacing);

        if (isHalfCell && rowIndex === 5) {
            targetCellTop += cellHeight / 2;
        }

        const targetLeft = targetCellLeft + offsetX;
        const targetTop = targetCellTop + offsetY;

        console.log(`Template in cell [${templateCellRow}, ${templateCellCol}]` +
            (isHalfCell ? (isTopHalfTemplate ? " (top half)" : " (bottom half)") : "") +
            ` at offset (${offsetX}, ${offsetY})`);
        console.log(`Placing duplicate in cell [${rowIndex}, ${colIndex}]` +
            (isHalfCell ? (rowIndex === 4 ? " (top half)" : " (bottom half)") : "") +
            ` at position (${targetLeft}, ${targetTop})`);

        const monthOffset = monthIndex * 2;
        const targetPageIndex = settings.monthsStartPageIndex + monthOffset + 1;

        if (targetPageIndex >= this.doc.pages.length) {
            console.error(`Error: Target page index ${targetPageIndex} does not exist`);
            return null;
        }
        const targetPage = this.doc.pages.item(targetPageIndex);

        const duplicateLabel = `duplicate:${monthIndex}.${rowIndex}.${colIndex}:${templateLabel}`;
        const existingDuplicate = this.labelMap.get(duplicateLabel);

        if (existingDuplicate) {
            const pref = this.getDuplicationPreference(duplicateLabel);
            if (pref === "skip") {
                console.log(`Skipped duplicating '${item.label}' to month ${monthIndex} cell [${rowIndex},${colIndex}] (already exists)`);
                return null;
            }
            try {
                existingDuplicate.remove();
                this.labelMap.delete(duplicateLabel);
                console.log(`Removed existing duplicate '${duplicateLabel}'`);
            } catch (e: any) {
                console.error(`Error removing existing duplicate: ${e.message}`);
                return null;
            }
        }

        try {
            const duplicatedItem = item.duplicate(targetPage);
            duplicatedItem.label = duplicateLabel;
            duplicatedItem.move([targetLeft, targetTop]);
            this.labelMap.set(duplicateLabel, duplicatedItem);
            console.log(`Successfully duplicated '${item.label}' to month ${monthIndex} cell [${rowIndex},${colIndex}] on page ${targetPageIndex}`);
            return duplicatedItem;
        } catch (e: any) {
            console.error(`Error duplicating item: ${e.message}`);
            return null;
        }
    }

    private duplicateToMonthPage(item: any, monthIndex: number, isGridPage: boolean) {
        const templateLabel = this.getTemplateLabel(item);
        if (!templateLabel) {
            console.error(`Error: Item with label '${item.label}' is not a valid template label`);
            return null;
        }

        const settings = this.getSettings();
        const monthOffset = monthIndex * 2;
        const pageOffset = isGridPage ? 1 : 0;
        const targetPageIndex = settings.monthsStartPageIndex + monthOffset + pageOffset;

        if (targetPageIndex >= this.doc.pages.length) {
            console.error(`Error: Target page index ${targetPageIndex} does not exist`);
            return null;
        }
        const targetPage = this.doc.pages.item(targetPageIndex);

        const duplicateLabel = `duplicate:${monthIndex}:${templateLabel}`;
        const existingDuplicate = this.labelMap.get(duplicateLabel);

        if (existingDuplicate) {
            const pref = this.getDuplicationPreference(duplicateLabel);
            if (pref === "skip") {
                console.log(`Skipped duplicating '${item.label}' to month ${monthIndex} (already exists)`);
                return null;
            }
            try {
                existingDuplicate.remove();
                this.labelMap.delete(duplicateLabel);
                console.log(`Removed existing duplicate '${duplicateLabel}'`);
            } catch (e: any) {
                console.error(`Error removing existing duplicate: ${e.message}`);
                return null;
            }
        }

        try {
            const duplicatedItem = item.duplicate(targetPage);
            duplicatedItem.label = duplicateLabel;
            this.labelMap.set(duplicateLabel, duplicatedItem);
            console.log(`Successfully duplicated '${item.label}' to month ${monthIndex} (${isGridPage ? "grid" : "header"} page, page index ${targetPageIndex})`);
            return duplicatedItem;
        } catch (e: any) {
            console.error(`Error duplicating item: ${e.message}`);
            return null;
        }
    }

    private drawDividerHLine(monthIndex: number, rowIndex: number, colIndex?: number) {
        const isHalfCell = (colIndex !== undefined);
        const settings = this.getSettings();
        const frameBounds = this.getGridGeometricBounds();
        if (!frameBounds) {
            console.error("Error: Could not find template:grid in label map");
            return null;
        }
        const [frameTop, frameLeft, frameBottom, frameRight] = frameBounds;
        const frameWidth = frameRight - frameLeft;
        const frameHeight = frameBottom - frameTop;
        const cellWidth = (frameWidth - 6 * settings.horizontalGridSpacing) / 7;
        const cellHeight = (frameHeight - 4 * settings.verticalGridSpacing) / 5;

        let lineY, lineLeft, lineRight;

        if (isHalfCell && colIndex !== undefined) {
            const cellTop = frameTop + 4 * (cellHeight + settings.verticalGridSpacing);
            const halfCellHeight = cellHeight / 2;
            lineY = cellTop + halfCellHeight;
            lineLeft = frameLeft + colIndex * (cellWidth + settings.horizontalGridSpacing);
            lineRight = lineLeft + cellWidth;
        } else {
            lineY = frameTop + (rowIndex + 1) * cellHeight;
            lineLeft = frameLeft;
            lineRight = frameRight;
        }

        const monthOffset = monthIndex * 2;
        const targetPageIndex = settings.monthsStartPageIndex + monthOffset + 1;
        if (targetPageIndex >= this.doc.pages.length) {
            console.error(`Error: Target page index ${targetPageIndex} does not exist`);
            return null;
        }
        const targetPage = this.doc.pages.item(targetPageIndex);

        const dividerLabel = isHalfCell ?
            `duplicate:${monthIndex}.${rowIndex}.${colIndex}:hline` :
            `duplicate:${monthIndex}.${rowIndex}:hline`;

        const existingDivider = this.labelMap.get(dividerLabel);
        if (existingDivider) {
            const pref = this.getDuplicationPreference(dividerLabel);
            if (pref === "skip") {
                console.log(`Skipped creating horizontal divider line for month ${monthIndex}`);
                return null;
            }
            try {
                existingDivider.remove();
                this.labelMap.delete(dividerLabel);
                console.log(`Removed existing divider '${dividerLabel}'`);
            } catch (e: any) {
                console.error(`Error removing existing divider: ${e.message}`);
                return null;
            }
        }

        try {
            const dividersLayer = this.doc.layers.itemByName("auto_dividers");
            if (!dividersLayer.isValid) {
                console.error("Error: auto_dividers layer not found");
                return null;
            }

            const line = targetPage.graphicLines.add(dividersLayer);
            line.geometricBounds = [lineY, lineLeft, lineY, lineRight];
            line.label = dividerLabel;
            line.strokeWeight = settings.gridDividerWeight;

            line.strokeColor = this.doc.colors.add({
                space: ColorSpace.RGB,
                colorValue: settings.gridDividerColor,
            });

            this.labelMap.set(dividerLabel, line);
            console.log(`Created horizontal divider line for month ${monthIndex}`);
            return line;
        } catch (e: any) {
            console.error(`Error creating horizontal divider line: ${e.message}`);
            return null;
        }
    }

    private drawDividerVLine(monthIndex: number, rowIndex: number, colIndex: number) {
        const settings = this.getSettings();
        if (settings.horizontalGridSpacing > 0) return null;

        const frameBounds = this.getGridGeometricBounds();
        if (!frameBounds) {
            console.error("Error: Could not find template:grid in label map");
            return null;
        }
        const [frameTop, frameLeft, frameBottom, frameRight] = frameBounds;
        const frameWidth = frameRight - frameLeft;
        const frameHeight = frameBottom - frameTop;
        const cellWidth = frameWidth / 7;
        const cellHeight = (frameHeight - 4 * settings.verticalGridSpacing) / 5;

        const lineX = frameLeft + (colIndex + 1) * cellWidth;
        const lineTop = frameTop + rowIndex * (cellHeight + settings.verticalGridSpacing);
        const lineBottom = lineTop + cellHeight;

        const monthOffset = monthIndex * 2;
        const targetPageIndex = settings.monthsStartPageIndex + monthOffset + 1;
        if (targetPageIndex >= this.doc.pages.length) {
            console.error(`Error: Target page index ${targetPageIndex} does not exist`);
            return null;
        }
        const targetPage = this.doc.pages.item(targetPageIndex);

        const dividerLabel = `duplicate:${monthIndex}.${rowIndex}.${colIndex}:vline`;
        const existingDivider = this.labelMap.get(dividerLabel);

        if (existingDivider) {
            const pref = this.getDuplicationPreference(dividerLabel);
            if (pref === "skip") {
                console.log(`Skipped creating vertical divider line for month ${monthIndex}`);
                return null;
            }
            try {
                existingDivider.remove();
                this.labelMap.delete(dividerLabel);
                console.log(`Removed existing divider '${dividerLabel}'`);
            } catch (e: any) {
                console.error(`Error removing existing divider: ${e.message}`);
                return null;
            }
        }

        try {
            const dividersLayer = this.doc.layers.itemByName("auto_dividers");
            if (!dividersLayer.isValid) {
                console.error("Error: auto_dividers layer not found");
                return null;
            }

            const line = targetPage.graphicLines.add(dividersLayer);
            line.geometricBounds = [lineTop, lineX, lineBottom, lineX];
            line.label = dividerLabel;
            line.strokeWeight = settings.gridDividerWeight;

            line.strokeColor = this.doc.colors.add({
                space: ColorSpace.RGB,
                colorValue: settings.gridDividerColor,
            });

            this.labelMap.set(dividerLabel, line);
            console.log(`Created vertical divider line for month ${monthIndex}`);
            return line;
        } catch (e: any) {
            console.error(`Error creating divider line: ${e.message}`);
            return null;
        }
    }

    private processCellDate(dateData: DateBox, month: number, row: number, col: number, isHalfCell: boolean) {
        const cellType = isHalfCell ? "half" : "full";

        // BASE LAYER
        const bgMap: Record<string, string> = {
            "STANDARD": "standard",
            "FASTING": "fasting"
        };
        let baseLabel = bgMap[dateData.background] ?
            `template:cell:${cellType}:base:${bgMap[dateData.background]}` :
            null;

        if (baseLabel && this.labelMap.has(baseLabel)) {
            const base = this.duplicateToDateBox(this.labelMap.get(baseLabel), month, row, col, isHalfCell);
            if (base) {
                const newDateStyle = `auto:text:${cellType}:new:${dateData.isFeast ? "feast" : "standard"}`;
                const oldDateStyle = `auto:text:${cellType}:old:${dateData.isSecondaryFeast ? "feast" : "standard"}`;
                const noteStyle = `auto:text:${cellType}:note`;

                base.contents = "";
                const styleSections: string[] = [];
                base.contents = dateData.date.toString();
                styleSections.push(newDateStyle);

                base.contents += "\r" + dateData.secondaryDate.toString();
                styleSections.push(oldDateStyle);

                if (dateData.note) {
                    base.contents += "\r" + dateData.note;
                    styleSections.push(noteStyle);
                }

                base.paragraphs
                    .everyItem()
                    .getElements()
                    .forEach((paragraph: any, index: number) => {
                        paragraph.appliedParagraphStyle =
                            this.doc.paragraphStyles.itemByName(styleSections[index]);
                    });
            }
        }

        // INDICATORS
        const fastMap: Record<string, string> = {
            "DAIRY": "dairy",
            "FISH": "fish",
            "OIL": "oil"
        };
        let fastingLabel = fastMap[dateData.fasting] ?
            `template:cell:${cellType}:fasting:${fastMap[dateData.fasting]}` :
            null;

        if (fastingLabel && this.labelMap.has(fastingLabel)) {
            this.duplicateToDateBox(this.labelMap.get(fastingLabel), month, row, col, isHalfCell);
        }

        const moonMap: Record<string, string> = {
            "NEW": "new",
            "FIRST": "first",
            "FULL": "full",
            "LAST": "last"
        };
        let moonLabel = moonMap[dateData.moon] ?
            `template:cell:${cellType}:moon:${moonMap[dateData.moon]}` :
            null;

        if (moonLabel && this.labelMap.has(moonLabel)) {
            this.duplicateToDateBox(this.labelMap.get(moonLabel), month, row, col, isHalfCell);
        }

        // MAIN TEXT
        const mainTextLabel = `template:cell:${cellType}:text:main`;
        if (dateData.mainText && this.labelMap.has(mainTextLabel)) {
            const textFrame = this.duplicateToDateBox(this.labelMap.get(mainTextLabel), month, row, col, isHalfCell);
            if (textFrame) {
                textFrame.contents = "";
                const styleSections: string[] = [];

                if (dateData.mainText.feast && dateData.mainText.feast[0]) {
                    if (styleSections.length > 0) textFrame.contents += "\r";
                    textFrame.contents += dateData.mainText.feast[0];
                    styleSections.push(`auto:text:${cellType}:eng:feast`);
                }
                if (dateData.mainText.feast && dateData.mainText.feast[1]) {
                    if (styleSections.length > 0) textFrame.contents += "\r";
                    textFrame.contents += dateData.mainText.feast[1];
                    styleSections.push(`auto:text:${cellType}:gr:feast`);
                }
                if (dateData.mainText.saint && dateData.mainText.saint[0]) {
                    if (styleSections.length > 0) textFrame.contents += "\r";
                    textFrame.contents += dateData.mainText.saint[0];
                    styleSections.push(`auto:text:${cellType}:eng:saint`);
                }
                if (dateData.mainText.saint && dateData.mainText.saint[1]) {
                    if (styleSections.length > 0) textFrame.contents += "\r";
                    textFrame.contents += dateData.mainText.saint[1];
                    styleSections.push(`auto:text:${cellType}:gr:saint`);
                }
                if (dateData.mainText.note && dateData.mainText.note[0]) {
                    if (styleSections.length > 0) textFrame.contents += "\r";
                    textFrame.contents += dateData.mainText.note[0];
                    styleSections.push(`auto:text:${cellType}:eng:note`);
                }
                if (dateData.mainText.note && dateData.mainText.note[1]) {
                    if (styleSections.length > 0) textFrame.contents += "\r";
                    textFrame.contents += dateData.mainText.note[1];
                    styleSections.push(`auto:text:${cellType}:gr:note`);
                }

                textFrame.paragraphs
                    .everyItem()
                    .getElements()
                    .forEach((paragraph: any, index: number) => {
                        paragraph.appliedParagraphStyle =
                            this.doc.paragraphStyles.itemByName(styleSections[index]);
                    });
            }
        }

        // LOWER TEXT (Readings)
        const readingsTextLabel = `template:cell:${cellType}:text:readings`;
        if (dateData.lowerText && this.labelMap.has(readingsTextLabel)) {
            const readingsTextFrame = this.duplicateToDateBox(this.labelMap.get(readingsTextLabel), month, row, col, isHalfCell);
            if (readingsTextFrame) {
                readingsTextFrame.contents = "";
                let paragraphCount = 0;

                if (dateData.lowerText.tone) {
                    readingsTextFrame.contents += dateData.lowerText.tone;
                    paragraphCount++;
                }
                if (dateData.lowerText.readings) {
                    for (const reading of dateData.lowerText.readings) {
                        if (paragraphCount > 0) readingsTextFrame.contents += "\r";
                        readingsTextFrame.contents += reading;
                        paragraphCount++;
                    }
                }

                const readingsStyle = `auto:text:${cellType}:readings`;
                readingsTextFrame.paragraphs
                    .everyItem()
                    .getElements()
                    .forEach((paragraph: any) => {
                        paragraph.appliedParagraphStyle =
                            this.doc.paragraphStyles.itemByName(readingsStyle);
                    });
            }
        }
    }

    private processNote(cell: NoteBox, month: number, row: number, col: number) {
        // BASE LAYER
        const baseLabel = "template:note:base";
        if (this.labelMap.has(baseLabel)) {
            const baseFrame = this.duplicateToDateBox(this.labelMap.get(baseLabel), month, row, col, false);
            if (baseFrame && cell.note) {
                baseFrame.contents = cell.note;
                baseFrame.paragraphs
                    .everyItem()
                    .getElements()
                    .forEach((paragraph: any) => {
                        paragraph.appliedParagraphStyle =
                            this.doc.paragraphStyles.itemByName("auto:text:full:note");
                    });
            }
        }

        // TEXT LAYER
        const textLabel = "template:note:text";
        if (this.labelMap.has(textLabel)) {
            const textFrame = this.duplicateToDateBox(this.labelMap.get(textLabel), month, row, col, false);
            if (textFrame && cell.text) {
                textFrame.contents = "";
                const styleSections: string[] = [];
                if (cell.text[0]) {
                    textFrame.contents += cell.text[0];
                    styleSections.push("auto:text:full:eng:note");
                }
                if (cell.text[1]) {
                    if (styleSections.length > 0) textFrame.contents += "\r";
                    textFrame.contents += cell.text[1];
                    styleSections.push("auto:text:full:gr:note");
                }

                textFrame.paragraphs
                    .everyItem()
                    .getElements()
                    .forEach((paragraph: any, index: number) => {
                        paragraph.appliedParagraphStyle =
                            this.doc.paragraphStyles.itemByName(styleSections[index]);
                    });
            }
        }
    }
}
