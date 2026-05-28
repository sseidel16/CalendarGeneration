// @ts-ignore: uxp types not available
import { app } from "indesign";

import "./Home.css";
import { useCallback, useRef, useState } from "react";
import { CalendarUtils } from "../util/CalendarUtil";
import { generateCalendarYear, GREGORIAN, PROPORTIONAL, CalendarScriptSettings } from "../data/calendar";
import type { CalendarData } from "../data/calendar";

const YEARS = [
    "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027",
    "2028", "2029", "2030"
];
const MONTHS = [
    "All Months", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const Home = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);

    // Calendar options
    const [yearIndex, setYearIndex] = useState(7); // default "2027"
    const [monthIndex, setMonthIndex] = useState(0); // 0 = all months, 1-12 = specific

    // Settings state
    const [duplicationPreference, setDuplicationPreference] = useState<"skip" | "replace">("replace");
    const [headerTemplatePageIndex, setHeaderTemplatePageIndex] = useState(0);
    const [gridTemplatePageIndex, setGridTemplatePageIndex] = useState(1);
    const [monthsStartPageIndex, setMonthsStartPageIndex] = useState(3);
    const [verticalGridSpacing, setVerticalGridSpacing] = useState(0.1);
    const [horizontalGridSpacing, setHorizontalGridSpacing] = useState(0);
    const [gridDividerWeight, setGridDividerWeight] = useState("1pt");
    const [gridDividerColor, setGridDividerColor] = useState("#000000");

    const utilsRef = useRef(new CalendarUtils());
    const isInitializedRef = useRef(false);

    const hexToRgb = (hex: string): [number, number, number] => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    };

    const getSettingsObject = (): CalendarScriptSettings => {
        return {
            duplicationPreference,
            headerTemplatePageIndex,
            gridTemplatePageIndex,
            monthsStartPageIndex,
            verticalGridSpacing,
            horizontalGridSpacing,
            gridDividerWeight,
            gridDividerColor: hexToRgb(gridDividerColor)
        };
    };

    const ensureInitialized = (doc: any) => {
        if (!isInitializedRef.current) {
            console.log("Initializing CalendarUtils...");
            utilsRef.current.initialize(doc);
            isInitializedRef.current = true;
        } else if (utilsRef.current.doc !== doc) {
            console.log("Document changed, re-initializing...");
            utilsRef.current.initialize(doc);
            isInitializedRef.current = true;
        }
    };

    const generateData = (): CalendarData => {
        const year = parseInt(YEARS[yearIndex]);
        const fullYear = generateCalendarYear(year, {
            calendar: GREGORIAN,
            readingsLayout: { maxLines: 3, maxLineWidth: 33, charWidth: PROPORTIONAL },
        });

        if (monthIndex === 0) return fullYear;

        return {
            year: fullYear.year,
            months: [fullYear.months[monthIndex - 1]],
        };
    };

    const progressCallback = useCallback(async (pct: number) => {
        setProgress(oldPct => {
            if (pct > oldPct) {
                console.log(`Progress: ${pct}%`);
                return pct;
            }
            return oldPct;
        });
        await new Promise(resolve => setTimeout(resolve, 0));
    }, []);

    const handleClean = async () => {
        try {
            setIsRunning(true);
            setProgress(0);

            const doc = app.activeDocument;
            if (!doc) {
                console.log("No active document");
                return;
            }
            ensureInitialized(doc);
            console.log("Cleaning calendar...");

            utilsRef.current.setSettings(getSettingsObject());

            await utilsRef.current.cleanCalendar(progressCallback);
        } finally {
            setIsRunning(false);
        }
    };

    const handleGenerate = async () => {
        try {
            setIsRunning(true);
            setProgress(0);

            const doc = app.activeDocument;
            if (!doc) {
                console.log("No active document");
                return;
            }
            ensureInitialized(doc);
            console.log(`Generating calendar for ${YEARS[yearIndex]}${monthIndex > 0 ? ` (${MONTHS[monthIndex]})` : ''}...`);

            utilsRef.current.setSettings(getSettingsObject());

            const calendarData = generateData();
            const startMonthIndex = monthIndex > 0 ? monthIndex - 1 : 0;
            await utilsRef.current.generateCalendar(calendarData, progressCallback, startMonthIndex);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="home-container">
            <div className="settings-panel">
                <div className="settings-group">
                    <label>Year</label>
                    <select
                        value={yearIndex}
                        onChange={(e) => setYearIndex(parseInt(e.target.value))}
                        disabled={isRunning}
                    >
                        {YEARS.map((name, i) => (
                            <option key={i} value={i}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="settings-group">
                    <label>Update</label>
                    <select
                        value={monthIndex}
                        onChange={(e) => setMonthIndex(parseInt(e.target.value))}
                        disabled={isRunning}
                    >
                        {MONTHS.map((name, i) => (
                            <option key={i} value={i}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="settings-group">
                    <label>Duplication Preference</label>
                    <select
                        value={duplicationPreference}
                        onChange={(e) => setDuplicationPreference(e.target.value as any)}
                        disabled={isRunning}
                    >
                        <option value="replace">Replace Existing</option>
                        <option value="skip">Skip Existing</option>
                    </select>
                </div>

                <div className="settings-group">
                    <label>Header Template Page</label>
                    <input
                        type="number"
                        value={headerTemplatePageIndex}
                        onChange={(e) => setHeaderTemplatePageIndex(parseInt(e.target.value))}
                        disabled={isRunning}
                    />
                </div>
                <div className="settings-group">
                    <label>Grid Template Page</label>
                    <input
                        type="number"
                        value={gridTemplatePageIndex}
                        onChange={(e) => setGridTemplatePageIndex(parseInt(e.target.value))}
                        disabled={isRunning}
                    />
                </div>
                <div className="settings-group">
                    <label>Start Page Index</label>
                    <input
                        type="number"
                        value={monthsStartPageIndex}
                        onChange={(e) => setMonthsStartPageIndex(parseInt(e.target.value))}
                        disabled={isRunning}
                    />
                </div>

                <div className="settings-group">
                    <label>Vertical Spacing (in)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={verticalGridSpacing}
                        onChange={(e) => setVerticalGridSpacing(parseFloat(e.target.value))}
                        disabled={isRunning}
                    />
                </div>
                <div className="settings-group">
                    <label>Horizontal Spacing (in)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={horizontalGridSpacing}
                        onChange={(e) => setHorizontalGridSpacing(parseFloat(e.target.value))}
                        disabled={isRunning}
                    />
                </div>

                <div className="settings-group">
                    <label>Divider Weight</label>
                    <input
                        type="text"
                        value={gridDividerWeight}
                        onChange={(e) => setGridDividerWeight(e.target.value)}
                        disabled={isRunning}
                    />
                </div>
                <div className="settings-group">
                    <label>Divider Color</label>
                    <input
                        type="color"
                        value={gridDividerColor}
                        onChange={(e) => setGridDividerColor(e.target.value)}
                        disabled={isRunning}
                    />
                </div>
            </div>

            <div className="actions-panel">
                {
                    isRunning ? (
                        <div className="progress-wrapper">
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="progress-text">{Math.round(progress)}%</div>
                        </div>
                    ) : (
                        <div className="btn-group">
                            <button className="main-btn" onClick={handleClean}>Clean Calendar</button>
                            <button className="main-btn" onClick={handleGenerate}>Generate Calendar</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
