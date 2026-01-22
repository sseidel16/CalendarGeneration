#target "InDesign"

var HEADER_TEMPLATE_PAGE_INDEX = 0;
var GRID_TEMPLATE_PAGE_INDEX = 1;

var MONTHS_START_PAGE_INDEX = 3; // index 2 is the main calendar cover page

var VERTICAL_GRID_SPACING = 0.1; // inches
var HORIZONTAL_GRID_SPACING = 0; // 0 means use a divider
var GRID_DIVIDER_WEIGHT = "1pt";
var GRID_DIVIDER_COLOR = [0, 0, 0]; // RGB: Black

var calendarData = {};

// top-level label map accessible to other functions
var labelMap = {};

// Cache for grid geometric bounds (managed by getGridGeometricBounds)
var _gridBoundsCache = null;

/**
 * Get the geometric bounds of the grid frame, with caching for performance
 * @returns {Array|null} Array of [top, left, bottom, right] or null if grid not found
 */
function getGridGeometricBounds() {
    if (_gridBoundsCache !== null) {
        return _gridBoundsCache;
    }

    var gridFrame = labelMap["template:grid"];
    if (!gridFrame) {
        return null;
    }

    _gridBoundsCache = gridFrame.geometricBounds;
    return _gridBoundsCache;
}

// Helper: get the suffix of a template label (after "template:")
/** @param {Object} item PageItem with a `label` property
 *  @returns {string|null} The label suffix, or null if not a template label
 */
function getTemplateLabel(item) {
    if (item && typeof item.label === 'string' && item.label.indexOf('template:') === 0) {
        return item.label.substring(9);
    }
    return null;
}

// Helper: get the suffix of a duplicate label (after "duplicate:")
/** @param {Object} item PageItem with a `label` property
 *  @returns {string|null} The label suffix, or null if not a duplicate label
 */
function getDuplicateLabel(item) {
    if (item && typeof item.label === 'string' && item.label.indexOf('duplicate:') === 0) {
        return item.label.substring(10);
    }
    return null;
}

// top-level duplication preference (null, "skipAll", "replaceAll")
var duplicationPreference = null;

/**
 * Get the user's preference for handling duplicate items
 * @param {string} label - The label that already exists
 * @returns {string} "skip" or "replace"
 */
function getDuplicationPreference(label) {
    // If user already selected "all" option, return that preference
    if (duplicationPreference === "skipAll") {
        return "skip";
    }
    if (duplicationPreference === "replaceAll") {
        return "replace";
    }

    // Show dialog to get user preference
    var dialog = new Window("dialog", "Duplicate Item Found");
    dialog.alignChildren = "fill";

    var msgPanel = dialog.add("panel");
    msgPanel.add("statictext", undefined, "Item with label '" + label + "' already exists.");
    msgPanel.add("statictext", undefined, "What would you like to do?");

    var buttonPanel = dialog.add("group");
    buttonPanel.orientation = "column";
    buttonPanel.alignChildren = "fill";

    var skipBtn = buttonPanel.add("button", undefined, "Skip", {
        name: "skip"
    });
    var replaceBtn = buttonPanel.add("button", undefined, "Replace", {
        name: "replace"
    });
    var skipAllBtn = buttonPanel.add("button", undefined, "Skip All", {
        name: "skipAll"
    });
    var replaceAllBtn = buttonPanel.add("button", undefined, "Replace All", {
        name: "replaceAll"
    });

    var result = "skip"; // default

    skipBtn.onClick = function() {
        result = "skip";
        dialog.close();
    };

    replaceBtn.onClick = function() {
        result = "replace";
        dialog.close();
    };

    skipAllBtn.onClick = function() {
        result = "skipAll";
        duplicationPreference = "skipAll";
        dialog.close();
    };

    replaceAllBtn.onClick = function() {
        result = "replaceAll";
        duplicationPreference = "replaceAll";
        dialog.close();
    };

    dialog.show();
    return result;
}

/**
 * Duplicate an item to a specific date box in the grid
 * @param {Object} item - The item to duplicate (must have a template label)
 * @param {number} monthIndex - Zero-based month index (0=January, 11=December)
 * @param {number} rowIndex - Zero-based row index in the grid (0-4 for full cells, 4-5 for half cells)
 * @param {number} colIndex - Zero-based column index in the grid
 * @param {boolean} isHalfCell - If true, rowIndex 4=top half, 5=bottom half of row 4
 * @returns {Object|null} The duplicated item, or null if duplication failed
 */
function duplicateToDateBox(item, monthIndex, rowIndex, colIndex, isHalfCell) {
    // Verify it's a template label and get the suffix
    var templateLabel = getTemplateLabel(item);
    if (!templateLabel) {
        $.writeln("Error: Item with label '" + item.label + "' is not a valid template label");
        return null;
    }

    // Validate month index
    if (monthIndex < 0 || monthIndex > 11) {
        $.writeln("Error: Month index must be between 0 and 11, got " + monthIndex);
        return null;
    }

    // Validate row and column indices
    if (isHalfCell) {
        // Half cells: rowIndex must be 4 (top half) or 5 (bottom half)
        if (rowIndex < 4 || rowIndex > 5) {
            $.writeln("Error: Half cell row index " + rowIndex + " out of bounds (must be 4 or 5)");
            return null;
        }
    } else {
        // Full cells: rowIndex must be 0-4
        if (rowIndex < 0 || rowIndex >= 5) {
            $.writeln("Error: Row index " + rowIndex + " out of bounds (must be 0-4)");
            return null;
        }
    }
    if (colIndex < 0 || colIndex >= 7) {
        $.writeln("Error: Column index " + colIndex + " out of bounds (must be 0-6)");
        return null;
    }

    // Get the geometric bounds of the grid text frame (cached)
    // Format: [top, left, bottom, right]
    var frameBounds = getGridGeometricBounds();
    if (!frameBounds) {
        $.writeln("Error: Could not find template:grid in label map");
        return null;
    }
    var frameTop = frameBounds[0];
    var frameLeft = frameBounds[1];
    var frameBottom = frameBounds[2];
    var frameRight = frameBounds[3];

    var frameWidth = frameRight - frameLeft;
    var frameHeight = frameBottom - frameTop;

    // Calculate individual cell dimensions
    // 7 columns with 6 gaps between them
    var cellWidth = (frameWidth - 6 * HORIZONTAL_GRID_SPACING) / 7;
    // 5 rows with 4 gaps between them (header is in a separate element)
    var cellHeight = (frameHeight - 4 * VERTICAL_GRID_SPACING) / 5;

    // Get the template item's current bounds to determine its position in the template grid
    var templateBounds = item.geometricBounds;
    var templateTop = templateBounds[0];
    var templateLeft = templateBounds[1];
    var templateBottom = templateBounds[2];
    var templateRight = templateBounds[3];

    // Calculate the center point of the template
    var templateCenterX = (templateLeft + templateRight) / 2;
    var templateCenterY = (templateTop + templateBottom) / 2;

    // Determine which cell the template is in based on its center point
    var templateCellCol = Math.floor((templateCenterX - frameLeft) / (cellWidth + HORIZONTAL_GRID_SPACING));
    var templateCellRow = Math.floor((templateCenterY - frameTop) / (cellHeight + VERTICAL_GRID_SPACING));

    // Calculate the template cell's top-left position
    var templateCellLeft = frameLeft + templateCellCol * (cellWidth + HORIZONTAL_GRID_SPACING);
    var templateCellTop = frameTop + templateCellRow * (cellHeight + VERTICAL_GRID_SPACING);

    // For half cells, determine if template is in top or bottom half
    var templateIsTopHalf = false;
    if (isHalfCell) {
        var halfCellHeight = cellHeight / 2;
        var offsetFromCellTop = templateCenterY - templateCellTop;
        templateIsTopHalf = offsetFromCellTop < halfCellHeight;
        // Adjust templateCellTop based on which half the template is in
        if (!templateIsTopHalf) {
            templateCellTop += halfCellHeight;
        }
    }

    // Calculate the offset of the template within its cell (using top-left of bounds)
    var offsetX = templateLeft - templateCellLeft;
    var offsetY = templateTop - templateCellTop;

    // Calculate the target cell position
    var targetCellLeft = frameLeft + colIndex * (cellWidth + HORIZONTAL_GRID_SPACING);
    // For target, use actual row 4 for both half cells
    var actualTargetRow = isHalfCell ? 4 : rowIndex;
    var targetCellTop = frameTop + actualTargetRow * (cellHeight + VERTICAL_GRID_SPACING);

    // For half cells, adjust target position based on whether it's top (4) or bottom (5)
    if (isHalfCell) {
        var halfCellHeight = cellHeight / 2;
        if (rowIndex === 5) {
            // Bottom half
            targetCellTop += halfCellHeight;
        }
        // rowIndex === 4 stays at top
    }

    // Calculate the final position for the duplicated item (applying the same offset)
    var targetLeft = targetCellLeft + offsetX;
    var targetTop = targetCellTop + offsetY;

    $.writeln("Template in cell [" + templateCellRow + "," + templateCellCol + "]" +
        (isHalfCell ? (templateIsTopHalf ? " (top half)" : " (bottom half)") : "") +
        " at offset (" + offsetX + ", " + offsetY + ")");
    $.writeln("Placing duplicate in cell [" + rowIndex + "," + colIndex + "]" +
        (isHalfCell ? (rowIndex === 4 ? " (top half)" : " (bottom half)") : "") +
        " at position (" + targetLeft + ", " + targetTop + ")");

    // Calculate the page index for the grid page of the target month
    var monthOffset = monthIndex * 2;
    var targetPageIndex = MONTHS_START_PAGE_INDEX + monthOffset + 1; // +1 for grid page

    // Get the document and verify the page exists
    var doc = app.activeDocument;
    if (targetPageIndex >= doc.pages.length) {
        $.writeln("Error: Target page index " + targetPageIndex + " does not exist");
        return null;
    }

    var targetPage = doc.pages[targetPageIndex];

    // Check if duplicate already exists
    var duplicateLabel = "duplicate:" + monthIndex + "." + rowIndex + "." + colIndex + ":" + templateLabel;
    var existingDuplicate = labelMap[duplicateLabel];

    if (existingDuplicate) {
        // Get user preference for handling the duplicate
        var preference = getDuplicationPreference(duplicateLabel);

        if (preference === "skip") {
            $.writeln("Skipped duplicating '" + item.label + "' to month " + monthIndex +
                " cell [" + rowIndex + "," + colIndex + "] (already exists)");
            return null;
        }

        // preference is "replace" - remove existing item
        try {
            existingDuplicate.remove();
            delete labelMap[duplicateLabel];
            $.writeln("Removed existing duplicate '" + duplicateLabel + "'");
        } catch (e) {
            $.writeln("Error removing existing duplicate: " + e.message);
            return null;
        }
    }

    // Duplicate the item to the target page
    try {
        var duplicatedItem = item.duplicate(targetPage);

        // Set the label to duplicate:[monthIndex].[rowIndex].[colIndex]:restoflabel
        duplicatedItem.label = duplicateLabel;

        // Move the duplicated item to the target position (maintaining relative position within cell)
        duplicatedItem.move([targetLeft, targetTop]);

        // Add to labelMap
        labelMap[duplicateLabel] = duplicatedItem;

        $.writeln("Successfully duplicated '" + item.label + "' to month " + monthIndex +
            " cell [" + rowIndex + "," + colIndex + "] on page " + targetPageIndex);

        return duplicatedItem;
    } catch (e) {
        $.writeln("Error duplicating item: " + e.message);
        return null;
    }
}

/**
 * Duplicate an item to a specific month page
 * @param {Object} item - The item to duplicate (must have a template label)
 * @param {number} monthIndex - Zero-based month index (0=January, 11=December)
 * @param {boolean} isGridPage - If true, duplicate to grid page; if false, duplicate to header page
 * @returns {Object|null} The duplicated item, or null if duplication failed
 */
function duplicateToMonthPage(item, monthIndex, isGridPage) {
    // Verify it's a template label and get the suffix
    var templateLabel = getTemplateLabel(item);
    if (!templateLabel) {
        $.writeln("Error: Item with label '" + item.label + "' is not a valid template label");
        return null;
    }

    // Validate month index
    if (monthIndex < 0 || monthIndex > 11) {
        $.writeln("Error: Month index must be between 0 and 11, got " + monthIndex);
        return null;
    }

    // Calculate the target page index
    // Each month has 2 pages: header page (even offset) and grid page (odd offset)
    var monthOffset = monthIndex * 2;
    var pageOffset = isGridPage ? 1 : 0;
    var targetPageIndex = MONTHS_START_PAGE_INDEX + monthOffset + pageOffset;

    // Get the document and verify the page exists
    var doc = app.activeDocument;
    if (targetPageIndex >= doc.pages.length) {
        $.writeln("Error: Target page index " + targetPageIndex + " does not exist");
        return null;
    }

    var targetPage = doc.pages[targetPageIndex];

    // Check if duplicate already exists
    var duplicateLabel = "duplicate:" + monthIndex + ":" + templateLabel;
    var existingDuplicate = labelMap[duplicateLabel];

    if (existingDuplicate) {
        // Get user preference for handling the duplicate
        var preference = getDuplicationPreference(duplicateLabel);

        if (preference === "skip") {
            $.writeln("Skipped duplicating '" + item.label + "' to month " + monthIndex + " (already exists)");
            return null;
        }

        // preference is "replace" - remove existing item
        try {
            existingDuplicate.remove();
            delete labelMap[duplicateLabel];
            $.writeln("Removed existing duplicate '" + duplicateLabel + "'");
        } catch (e) {
            $.writeln("Error removing existing duplicate: " + e.message);
            return null;
        }
    }

    // Duplicate the item to the target page
    try {
        var duplicatedItem = item.duplicate(targetPage);

        // Replace the label from template:restoflabel to duplicate:[monthIndex]:restoflabel
        duplicatedItem.label = duplicateLabel;

        // Add to labelMap
        labelMap[duplicateLabel] = duplicatedItem;

        $.writeln("Successfully duplicated '" + item.label + "' to month " + monthIndex +
            " (" + (isGridPage ? "grid" : "header") + " page, page index " + targetPageIndex + ")");

        return duplicatedItem;
    } catch (e) {
        $.writeln("Error duplicating item: " + e.message);
        return null;
    }
}

/**
 * Draw a horizontal divider line between rows (full width) or between half cells (single column)
 * @param {number} monthIndex - Zero-based month index (0=January, 11=December)
 * @param {number} rowIndex - Zero-based row index (0-3 for full cells, 4 for half cells)
 * @param {number} colIndex - Optional column index for half cell dividers
 * @returns {Object|null} The created line, or null if creation failed
 */
function drawDividerHLine(monthIndex, rowIndex, colIndex) {
    var isHalfCell = (colIndex !== undefined);

    // Validate row index based on whether it's a half cell
    if (isHalfCell) {
        // Half cells: rowIndex must be 4
        if (rowIndex !== 4) {
            $.writeln("Error: Half cell horizontal divider must have rowIndex=4, got " + rowIndex);
            return null;
        }
    } else {
        // Full cells: rowIndex must be 0-3, and skip if vertical spacing exists
        if (rowIndex < 0 || rowIndex > 3) {
            $.writeln("Error: Full cell horizontal divider rowIndex " + rowIndex + " out of bounds (must be 0-3)");
            return null;
        }
        if (VERTICAL_GRID_SPACING > 0) {
            return null;
        }
    }

    var doc = app.activeDocument;

    // Get the geometric bounds of the grid text frame (cached)
    var frameBounds = getGridGeometricBounds();
    if (!frameBounds) {
        $.writeln("Error: Could not find template:grid in label map");
        return null;
    }
    var frameTop = frameBounds[0];
    var frameLeft = frameBounds[1];
    var frameBottom = frameBounds[2];
    var frameRight = frameBounds[3];

    var frameWidth = frameRight - frameLeft;
    var frameHeight = frameBottom - frameTop;

    // Calculate individual cell dimensions
    var cellWidth = (frameWidth - 6 * HORIZONTAL_GRID_SPACING) / 7;
    var cellHeight = (frameHeight - 4 * VERTICAL_GRID_SPACING) / 5;

    var lineY, lineLeft, lineRight;

    if (isHalfCell) {
        // Half cell: line between top and bottom half of row 4, spanning single column
        var cellTop = frameTop + 4 * (cellHeight + VERTICAL_GRID_SPACING);
        var halfCellHeight = cellHeight / 2;
        lineY = cellTop + halfCellHeight;

        lineLeft = frameLeft + colIndex * (cellWidth + HORIZONTAL_GRID_SPACING);
        lineRight = lineLeft + cellWidth;
    } else {
        // Full cell: line at bottom of rowIndex, spanning entire grid width
        lineY = frameTop + (rowIndex + 1) * cellHeight;
        lineLeft = frameLeft;
        lineRight = frameRight;
    }

    // Calculate the page index for the grid page of the target month
    var monthOffset = monthIndex * 2;
    var targetPageIndex = MONTHS_START_PAGE_INDEX + monthOffset + 1; // +1 for grid page

    if (targetPageIndex >= doc.pages.length) {
        $.writeln("Error: Target page index " + targetPageIndex + " does not exist");
        return null;
    }

    var targetPage = doc.pages[targetPageIndex];

    // Create label based on whether it's a half cell
    var dividerLabel = isHalfCell ?
        "duplicate:" + monthIndex + "." + rowIndex + "." + colIndex + ":hline" :
        "duplicate:" + monthIndex + "." + rowIndex + ":hline";
    var existingDivider = labelMap[dividerLabel];

    if (existingDivider) {
        var preference = getDuplicationPreference(dividerLabel);

        if (preference === "skip") {
            $.writeln("Skipped creating horizontal divider line for month " + monthIndex +
                (isHalfCell ? " in cell [" + rowIndex + "," + colIndex + "]" : " after row " + rowIndex));
            return null;
        }

        try {
            existingDivider.remove();
            delete labelMap[dividerLabel];
            $.writeln("Removed existing divider '" + dividerLabel + "'");
        } catch (e) {
            $.writeln("Error removing existing divider: " + e.message);
            return null;
        }
    }

    // Create the horizontal line
    try {
        var dividersLayer = doc.layers.itemByName("auto_dividers");
        if (!dividersLayer.isValid) {
            $.writeln("Error: auto_dividers layer not found");
            return null;
        }

        var line = targetPage.graphicLines.add(dividersLayer);
        line.paths[0].entirePath = [
            [lineLeft, lineY],
            [lineRight, lineY]
        ];
        line.label = dividerLabel;

        // Set stroke properties
        line.strokeWeight = GRID_DIVIDER_WEIGHT;
        line.strokeColor = doc.colors.add({
            space: ColorSpace.RGB,
            colorValue: GRID_DIVIDER_COLOR
        });

        // Add to labelMap
        labelMap[dividerLabel] = line;

        $.writeln("Created horizontal divider line for month " + monthIndex +
            (isHalfCell ? " in cell [" + rowIndex + "," + colIndex + "]" : " after row " + rowIndex));

        return line;
    } catch (e) {
        $.writeln("Error creating horizontal divider line: " + e.message);
        return null;
    }
}

/**
 * Draw a vertical divider line between two cells
 * @param {number} monthIndex - Zero-based month index (0=January, 11=December)
 * @param {number} rowIndex - Zero-based row index in the grid
 * @param {number} colIndex - Zero-based column index (column before the line)
 * @returns {Object|null} The created line, or null if creation failed
 */
function drawDividerVLine(monthIndex, rowIndex, colIndex) {
    // Only draw dividers when there's no horizontal spacing
    if (HORIZONTAL_GRID_SPACING > 0) {
        return null;
    }

    var doc = app.activeDocument;

    // Get the geometric bounds of the grid text frame (cached)
    var frameBounds = getGridGeometricBounds();
    if (!frameBounds) {
        $.writeln("Error: Could not find template:grid in label map");
        return null;
    }
    var frameTop = frameBounds[0];
    var frameLeft = frameBounds[1];
    var frameBottom = frameBounds[2];
    var frameRight = frameBounds[3];

    var frameWidth = frameRight - frameLeft;
    var frameHeight = frameBottom - frameTop;

    // Calculate individual cell dimensions (no horizontal spacing between cells)
    var cellWidth = frameWidth / 7;
    var cellHeight = (frameHeight - 4 * VERTICAL_GRID_SPACING) / 5;

    // Calculate the position of the line (right edge of colIndex cell)
    var lineX = frameLeft + (colIndex + 1) * cellWidth;
    var lineTop = frameTop + rowIndex * (cellHeight + VERTICAL_GRID_SPACING);
    var lineBottom = lineTop + cellHeight;

    // Calculate the page index for the grid page of the target month
    var monthOffset = monthIndex * 2;
    var targetPageIndex = MONTHS_START_PAGE_INDEX + monthOffset + 1; // +1 for grid page

    if (targetPageIndex >= doc.pages.length) {
        $.writeln("Error: Target page index " + targetPageIndex + " does not exist");
        return null;
    }

    var targetPage = doc.pages[targetPageIndex];

    // Check if divider already exists
    var dividerLabel = "duplicate:" + monthIndex + "." + rowIndex + "." + colIndex + ":vline";
    var existingDivider = labelMap[dividerLabel];

    if (existingDivider) {
        var preference = getDuplicationPreference(dividerLabel);

        if (preference === "skip") {
            $.writeln("Skipped creating divider line for month " + monthIndex +
                " between cells [" + rowIndex + "," + colIndex + "] and [" + rowIndex + "," + (colIndex + 1) + "]");
            return null;
        }

        try {
            existingDivider.remove();
            delete labelMap[dividerLabel];
            $.writeln("Removed existing divider '" + dividerLabel + "'");
        } catch (e) {
            $.writeln("Error removing existing divider: " + e.message);
            return null;
        }
    }

    // Create the vertical line
    try {
        var dividersLayer = doc.layers.itemByName("auto_dividers");
        if (!dividersLayer.isValid) {
            $.writeln("Error: auto_dividers layer not found");
            return null;
        }

        var line = targetPage.graphicLines.add(dividersLayer);
        line.paths[0].entirePath = [
            [lineX, lineTop],
            [lineX, lineBottom]
        ];
        line.label = dividerLabel;

        // Set stroke properties
        line.strokeWeight = GRID_DIVIDER_WEIGHT;
        line.strokeColor = doc.colors.add({
            space: ColorSpace.RGB,
            colorValue: GRID_DIVIDER_COLOR
        });

        // Add to labelMap
        labelMap[dividerLabel] = line;

        $.writeln("Created vertical divider line for month " + monthIndex +
            " between cells [" + rowIndex + "," + colIndex + "] and [" + rowIndex + "," + (colIndex + 1) + "]");

        return line;
    } catch (e) {
        $.writeln("Error creating divider line: " + e.message);
        return null;
    }
}

/**
 * Process and duplicate a single date cell's content
 * @param {Object} doc Document
 * @param {Object} dateData Cell data with type "DATE"
 * @param {number} month Month index
 * @param {number} row Row index
 * @param {number} col Column index
 * @param {boolean} isHalfCell Whether this is a half cell
 * @returns {void}
 */
function processCellDate(doc, dateData, month, row, col, isHalfCell) {
    var cellType = isHalfCell ? "half" : "full";
    /*
     ** BASE LAYER
     */

    // look at the background property and set the template label
    var baseLabel = "template:cell:" + cellType + ":base:" + {
        "STANDARD": "standard",
        "FASTING": "fasting"
    } [dateData.background] || "null";
    if (baseLabel.indexOf("null") !== -1) baseLabel = null;

    // duplicate the template if we have a valid label
    if (baseLabel && labelMap[baseLabel]) {
        var base = duplicateToDateBox(labelMap[baseLabel], month, row, col, isHalfCell);

        if (base) {
            // Determine if this is a feast day
            var isFeast = dateData.mainText && dateData.mainText.feast;

            // Determine paragraph style names
            var newDateStyle = "auto:text:" + cellType + ":new:" + (isFeast ? "feast" : "standard");
            var oldDateStyle = "auto:text:" + cellType + ":old:" + (isFeast ? "feast" : "standard");
            var noteStyle = "auto:text:" + cellType + ":note";

            // base IS the text frame (not a container with text frames)
            // Clear existing content
            base.contents = "";

            // Add new date
            base.contents = dateData.newDate.toString();
            base.paragraphs[0].appliedParagraphStyle = doc.paragraphStyles.itemByName(newDateStyle);

            // Add newline and old date
            base.contents += "\r" + dateData.oldDate.toString();
            base.paragraphs[1].appliedParagraphStyle = doc.paragraphStyles.itemByName(oldDateStyle);

            // Add note if present
            if (dateData.note) {
                base.contents += "\r" + dateData.note;
                base.paragraphs[2].appliedParagraphStyle = doc.paragraphStyles.itemByName(noteStyle);
            }
        }
    }

    /*
     ** INDICATORS LAYER
     */

    var fastingLabel = "template:cell:" + cellType + ":fasting:" + {
        "DAIRY": "dairy",
        "FISH": "fish",
        "OIL": "oil"
    } [dateData.fasting] || "null";
    if (fastingLabel.indexOf("null") !== -1) fastingLabel = null;

    // duplicate the template if we have a valid label
    if (fastingLabel && labelMap[fastingLabel]) {
        duplicateToDateBox(labelMap[fastingLabel], month, row, col, isHalfCell);
    }

    var moonLabel = "template:cell:" + cellType + ":moon:" + {
        "NEW": "new",
        "FIRST": "first",
        "FULL": "full",
        "LAST": "last"
    } [dateData.moon] || "null";
    if (moonLabel.indexOf("null") !== -1) moonLabel = null;

    // duplicate the template if we have a valid label
    if (moonLabel && labelMap[moonLabel]) {
        duplicateToDateBox(labelMap[moonLabel], month, row, col, isHalfCell);
    }

    /*
     ** MAIN TEXT LAYER
     */

    // text layer for mainText (feast, saint, note)
    var mainTextLabel = "template:cell:" + cellType + ":text:main";
    if (dateData.mainText && labelMap[mainTextLabel]) {
        var textFrame = duplicateToDateBox(labelMap[mainTextLabel], month, row, col, isHalfCell);

        if (textFrame) {
            textFrame.contents = "";
            var styleSections = [];

            // Add feast english
            if (dateData.mainText.feast && dateData.mainText.feast[0]) {
                if (styleSections.length > 0) textFrame.contents += "\r";
                textFrame.contents += dateData.mainText.feast[0];
                styleSections.push("auto:text:" + cellType + ":eng:feast");
            }

            // Add feast greek
            if (dateData.mainText.feast && dateData.mainText.feast[1]) {
                if (styleSections.length > 0) textFrame.contents += "\r";
                textFrame.contents += dateData.mainText.feast[1];
                styleSections.push("auto:text:" + cellType + ":gr:feast");
            }

            // Add saint english
            if (dateData.mainText.saint && dateData.mainText.saint[0]) {
                if (styleSections.length > 0) textFrame.contents += "\r";
                textFrame.contents += dateData.mainText.saint[0];
                styleSections.push("auto:text:" + cellType + ":eng:saint");
            }

            // Add saint greek
            if (dateData.mainText.saint && dateData.mainText.saint[1]) {
                if (styleSections.length > 0) textFrame.contents += "\r";
                textFrame.contents += dateData.mainText.saint[1];
                styleSections.push("auto:text:" + cellType + ":gr:saint");
            }

            // Add note english
            if (dateData.mainText.note && dateData.mainText.note[0]) {
                if (styleSections.length > 0) textFrame.contents += "\r";
                textFrame.contents += dateData.mainText.note[0];
                styleSections.push("auto:text:" + cellType + ":eng:note");
            }

            // Add note greek
            if (dateData.mainText.note && dateData.mainText.note[1]) {
                if (styleSections.length > 0) textFrame.contents += "\r";
                textFrame.contents += dateData.mainText.note[1];
                styleSections.push("auto:text:" + cellType + ":gr:note");
            }

            // Apply paragraph styles
            for (var i = 0; i < styleSections.length; i++) {
                textFrame.paragraphs[i].appliedParagraphStyle =
                    doc.paragraphStyles.itemByName(styleSections[i]);
            }
        }
    }

    // text layer for lowerText (tone, readings)
    var readingsTextLabel = "template:cell:" + cellType + ":text:readings";
    if (dateData.lowerText && labelMap[readingsTextLabel]) {
        var readingsTextFrame = duplicateToDateBox(labelMap[readingsTextLabel], month, row, col, isHalfCell);

        if (readingsTextFrame) {
            readingsTextFrame.contents = "";
            var paragraphCount = 0;

            // Add tone
            if (dateData.lowerText.tone) {
                readingsTextFrame.contents += dateData.lowerText.tone;
                paragraphCount++;
            }

            // Add all readings
            if (dateData.lowerText.readings) {
                for (var i = 0; i < dateData.lowerText.readings.length; i++) {
                    if (paragraphCount > 0) readingsTextFrame.contents += "\r";
                    readingsTextFrame.contents += dateData.lowerText.readings[i];
                    paragraphCount++;
                }
            }

            // Apply paragraph style to all paragraphs
            for (var i = 0; i < paragraphCount; i++) {
                readingsTextFrame.paragraphs[i].appliedParagraphStyle =
                    doc.paragraphStyles.itemByName("auto:text:" + cellType + ":readings");
            }
        }
    }
}

/**
 * Process and duplicate a NOTE cell's content
 * @param {Object} doc Document
 * @param {Object} cell Cell data with type "NOTE"
 * @param {number} month Month index
 * @param {number} row Row index
 * @param {number} col Column index
 * @returns {void}
 */
function processNote(doc, cell, month, row, col) {
    // BASE LAYER
    var baseLabel = "template:note:base";
    if (labelMap[baseLabel]) {
        var base = duplicateToDateBox(labelMap[baseLabel], month, row, col, false);
        if (base && cell.note) {
            base.contents = cell.note;
            base.paragraphs[0].appliedParagraphStyle = doc.paragraphStyles.itemByName("auto:text:full:note");
        }
    }

    // TEXT LAYER
    var textLabel = "template:note:text";
    if (labelMap[textLabel]) {
        var textFrame = duplicateToDateBox(labelMap[textLabel], month, row, col, false);
        if (textFrame && cell.text) {
            textFrame.contents = "";
            var styleSections = [];
            // English
            if (cell.text[0]) {
                textFrame.contents += cell.text[0];
                styleSections.push("auto:text:full:eng:note");
            }
            // Greek
            if (cell.text[1]) {
                if (styleSections.length > 0) textFrame.contents += "\r";
                textFrame.contents += cell.text[1];
                styleSections.push("auto:text:full:gr:note");
            }
            // Apply paragraph styles
            for (var i = 0; i < styleSections.length; i++) {
                textFrame.paragraphs[i].appliedParagraphStyle = doc.paragraphStyles.itemByName(styleSections[i]);
            }
        }
    }
}

/**
 * Clean all duplicate items from the calendar
 * @param {Object} doc Document
 * @returns {void}
 */
function cleanCalendar(doc, progressCallback) {
    var removedCount = 0;
    var totalItems = 2000;
    var processed = 0;

    for (var label in labelMap) {
        if (labelMap.hasOwnProperty(label) && getDuplicateLabel(labelMap[label])) {
            try {
                labelMap[label].remove();
                delete labelMap[label];
                removedCount++;
            } catch (e) {
                $.writeln("Error removing duplicate '" + label + "': " + e.message);
            }
        }

        processed++;
        progressCallback(Math.min(99, (processed / totalItems) * 100));
    }

    $.writeln("Removed " + removedCount + " duplicate items");
    alert("Calendar cleaned: " + removedCount + " items removed");
}

/**
 * Generate the calendar from calendarData
 * @param {Object} doc Document
 * @returns {void}
 */
function generateCalendar(doc, progressCallback) {
    var headerTemplatePage = doc.pages[HEADER_TEMPLATE_PAGE_INDEX];
    var gridTemplatePage = doc.pages[GRID_TEMPLATE_PAGE_INDEX];

    // duplicate the common layer on header and grid templates to all months

    var commonLayer = doc.layers.itemByName("auto_common");

    if (!commonLayer.isValid) {
        alert("Common layer not found");
        return;
    }

    var commonHeaderItems = headerTemplatePage.pageItems;
    var commonGridItems = gridTemplatePage.pageItems;

    var year = calendarData.year;
    var months = calendarData.months;

    for (var month = 0; month < months.length; month++) {
        var monthData = months[month];
        var gridData = monthData.grid;

        $.writeln("Processing month " + (month + 1) + " of year " + year);

        // duplicate common header items
        for (var i = 0; i < commonHeaderItems.length; i++) {
            if (commonHeaderItems[i].itemLayer === commonLayer) {
                duplicateToMonthPage(commonHeaderItems[i], month, false);
            }
        }

        // duplicate common grid items
        for (var i = 0; i < commonGridItems.length; i++) {
            if (commonGridItems[i].itemLayer === commonLayer) {
                duplicateToMonthPage(commonGridItems[i], month, true);
            }
        }

        // iterate through gridData and duplicate cell templates based on background
        for (var row = 0; row < gridData.length; row++) {
            for (var col = 0; col < gridData[row].length; col++) {
                var cell = gridData[row][col];

                /*
                 ** DIVIDERS
                 */

                // Draw vertical divider line if horizontal spacing is 0 and not at the last column
                if (HORIZONTAL_GRID_SPACING === 0 && col < gridData[row].length - 1) {
                    var nextCell = gridData[row][col + 1];
                    // Only draw line if at least one cell is not empty
                    if (cell.type !== "EMPTY" || nextCell.type !== "EMPTY") {
                        drawDividerVLine(month, row, col);
                    }
                }

                /*
                 ** CELL PROCESSING
                 */

                switch (cell.type) {
                    case "EMPTY":
                        // do nothing
                        break;
                    case "NOTE":
                        processNote(doc, cell, month, row, col);
                        break;
                    case "DATE":
                        processCellDate(doc, cell, month, row, col, false);
                        break;
                    case "SPLIT":
                        // Process top half (row 4)
                        if (cell.top && cell.top.type === "DATE") {
                            processCellDate(doc, cell.top, month, 4, col, true);
                        }
                        // Draw horizontal divider line between half cells
                        drawDividerHLine(month, 4, col);
                        // Process bottom half (row 5)
                        if (cell.bottom && cell.bottom.type === "DATE") {
                            processCellDate(doc, cell.bottom, month, 5, col, true);
                        }
                        break;
                }

                progressCallback(Math.min(99, (((month * 5 * 7) + (row * 7) + col) / (12 * 7 * 5)) * 100));
            }
        }
    }
}

// Build a label->element map. Accepts a Document (uses `doc.pageItems`). This
// function sets the top-level `labelMap` and intentionally returns nothing.
/**
 * Build a label->element map.
 * @param {Object} doc Document (with `pageItems`)
 * @returns {void}
 */
function buildLabelMap(doc) {
    var map = {};
    var collisions = 0;
    var firstCollisionLabel = null;

    // if a Document was passed, gather its pageItems
    if (doc && doc.pageItems) {
        var all = doc.pageItems.everyItem().getElements();
        $.writeln("Building label map from " + all.length + " items...");

        for (var i = 0; i < all.length; i++) {
            try {
                var item = all[i];
                // only include labels that begin with "template:" or "duplicate:"
                if (getTemplateLabel(item) || getDuplicateLabel(item)) {
                    var lbl = item.label;
                    if (!map.hasOwnProperty(lbl)) {
                        map[lbl] = item;
                    } else {
                        collisions++;
                        if (firstCollisionLabel === null) firstCollisionLabel = lbl;
                        $.writeln("Label collision: " + lbl);
                        // Keep first item, drop duplicates
                    }
                }
            } catch (e) {
                // ignore items that throw when accessed
            }
        }
    }

    // set the top-level map so other functions can access it
    labelMap = map;

    $.writeln("Label map built");

    if (collisions > 0) {
        alert(collisions + " collisions including " + firstCollisionLabel);
    }
}

(function() {
    var doc = app.activeDocument;

    // build a single global label map for the document
    buildLabelMap(doc);

    // Show dialog to select action
    var dialog = new Window("dialog", "Calendar Script");
    dialog.alignChildren = "fill";

    var msgPanel = dialog.add("panel");
    msgPanel.add("statictext", undefined, "What would you like to do?");

    var buttonPanel = dialog.add("group");
    buttonPanel.orientation = "column";
    buttonPanel.alignChildren = "fill";

    var generateBtn = buttonPanel.add("button", undefined, "Generate Calendar", {
        name: "generate"
    });
    var cleanBtn = buttonPanel.add("button", undefined, "Clean Calendar", {
        name: "clean"
    });
    var cancelBtn = buttonPanel.add("button", undefined, "Cancel", {
        name: "cancel"
    });

    var action = null;

    generateBtn.onClick = function() {
        action = "generate";
        dialog.close();
    };

    cleanBtn.onClick = function() {
        action = "clean";
        dialog.close();
    };

    cancelBtn.onClick = function() {
        action = "cancel";
        dialog.close();
    };

    dialog.show();

    // Progress bar dialog setup
    var progressDialog = new Window("palette", "Progress", undefined, {closeButton: false});
    progressDialog.alignChildren = "fill";
    var progressPanel = progressDialog.add("panel");
    progressPanel.add("statictext", undefined, "Processing...");
    var progressBar = progressPanel.add("progressbar", undefined, 0, 100);
    progressBar.value = 0;
    progressDialog.show();
    var update = function(pct) {
        var intPct = Math.floor(pct);
        if (progressBar.value !== intPct) {
            progressBar.value = intPct;
        }
        if (intPct >= 100) {
            progressDialog.close();
        }
    };

    // Execute selected action
    if (action === "generate") {
        generateCalendar(doc, update);
    } else if (action === "clean") {
        cleanCalendar(doc, update);
    }

    update(100); // close progress dialog
})();