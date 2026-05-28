export type { CalendarData, MonthData, GridData, BoxData, EmptyBox, NoteBox, SplitBox, DateBox } from '@orthodox-tools/calendar-data';
export { generateCalendarYear, GREGORIAN, JULIAN, PROPORTIONAL } from '@orthodox-tools/calendar-data';

export type CalendarScriptSettings = {
    duplicationPreference: "skip" | "replace";
    headerTemplatePageIndex: number;
    gridTemplatePageIndex: number;
    monthsStartPageIndex: number;
    verticalGridSpacing: number; // inches
    horizontalGridSpacing: number; // inches
    gridDividerWeight: string; // e.g. "1pt"
    gridDividerColor: [number, number, number]; // RGB
};
