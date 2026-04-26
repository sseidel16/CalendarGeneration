# InDesign Calendar Generator

A sophisticated Adobe InDesign UXP plugin for automated calendar generation. This tool transforms structured JSON data into beautiful, professional calendar spreads with extensive configuration options.

## 🚀 Key Features

- **Automated Generation**: Quickly build multi-month calendar spreads from data.
- **Configurable Architecture**: Fine-tune every aspect of the output via a persistent React UI.
- **Smart Templates**: Uses InDesign pages as templates for headers and grids, identified by Script Labels.
- **Robust Cleanup**: Instantly clear generated content while keeping your templates intact.
- **Real-time Feedback**: Integrated progress tracking for long-running generation tasks.
- **Styling Control**: Adjust grid spacing, divider weights, and colors directly from the plugin panel.

## 🛠 Technical Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Environment**: Adobe InDesign UXP (v18.5+)
- **Build Tool**: Webpack (via `npm run watch`/`build`)

## 📋 Configuration Parameters

The plugin provides a configuration panel to control the generation logic:

| Parameter | Description |
|-----------|-------------|
| **Duplication Preference** | Choose to `Replace` or `Skip` existing items in the document. |
| **Header Template Page** | 0-based index of the page containing the modular header template. |
| **Grid Template Page** | 0-based index of the page containing the modular grid template. |
| **Start Page Index** | The page index where the generated months will begin. |
| **Vertical Spacing** | Vertical gap between grid cells (in inches). |
| **Horizontal Spacing** | Horizontal gap between grid cells (in inches). Set to `0` to use lines. |
| **Divider Style** | Customizable weight (e.g., `1pt`) and RGB color for cell separators. |

## 🏗 Template Requirements

The plugin relies on **Script Labels** and specific **Layer** structures to identify elements for duplication and text replacement.

### Placeholders
In the tables below, the following placeholders are used:
- `{cell type}`: Can be either `half` or `full` depending on the cell design.
- `{lang}`: Can be either `eng` (English) or `gr` (Greek).

### Script Labels by Layer

| Layer | Script Label Pattern | Description |
|-------|----------------------|-------------|
| **auto_common** | `template:header` | Main header group/frame to be copied once per page. |
| | `template:header:month` | Combined text frame for the month header (contains English month, year, and Greek month). Uses a single paragraph style. |
| | `template:grid` | Master grid frame to be copied once per page. |
| | `template:*` | Any item with a `template:` prefix in this layer is automatically copied. |
| **auto_base** | `template:cell:{cell type}:base:standard` | Base frame for standard date boxes. |
| | `template:cell:{cell type}:base:fasting` | Base frame for date boxes with fasting background. |
| | `template:note:base` | Base frame for note boxes. |
| **auto_indicators** | `template:cell:{cell type}:fasting:dairy` | Fasting indicator (Dairy). |
| | `template:cell:{cell type}:fasting:fish` | Fasting indicator (Fish). |
| | `template:cell:{cell type}:fasting:oil` | Fasting indicator (Oil). |
| | `template:cell:{cell type}:moon:new` | Moon phase (New Moon). |
| | `template:cell:{cell type}:moon:first` | Moon phase (First Quarter). |
| | `template:cell:{cell type}:moon:full` | Moon phase (Full Moon). |
| | `template:cell:{cell type}:moon:last` | Moon phase (Last Quarter). |
| **auto_text** | `template:cell:{cell type}:text:main` | Main text frame for monthly/daily info. |
| | `template:cell:{cell type}:text:readings` | Frame specifically for scripture readings. |
| | `template:note:text` | Text frame within note boxes. |

### Paragraph Styles

The plugin automatically applies the following paragraph styles based on the cell content:

| Style Pattern | Purpose |
|---------------|---------|
| `auto:text:{cell type}:newdates:standard` | Standard New Calendar dates. |
| `auto:text:{cell type}:newdates:feast` | New Calendar dates on feast days. |
| `auto:text:{cell type}:olddates:standard` | Standard Old Calendar dates. |
| `auto:text:{cell type}:olddates:feast` | Old Calendar dates on feast days. |
| `auto:text:{cell type}:{lang}:feast` | Feast name text in specified language. |
| `auto:text:{cell type}:{lang}:saint` | Saint name/info text in specified language. |
| `auto:text:{cell type}:{lang}:note` | Extra notes in specified language. |
| `auto:text:{cell type}:note` | Generic note text. |
| `auto:text:{cell type}:readings` | Style for scripture readings. |
| `auto:text:header:month` | Paragraph style for the combined month header textbox. |

### Character Styles

The following character styles are applied to substrings within the combined header textbox:

| Style Pattern | Purpose |
|---------------|---------|
| `auto:char:header:eng:month` | Character style for the English month name. |
| `auto:char:header:gr:month` | Character style for the Greek month name. |
| `auto:char:header:year` | Character style for the year. |

## 🏁 Getting Started

### Prerequisites

1.  **Node.js**: v17.0 or below (recommended for UXP stability).
2.  **UXP Developer Tools (UDT)**: Necessary to load and debug the plugin.
3.  **InDesign**: v18.5 or higher.

### Installation

1.  Clone this repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development build:
    ```bash
    npm run watch
    ```

### Loading in InDesign

1.  Open **UXP Developer Tools**.
2.  Click **Add Plugin** and select the `plugin/manifest.json` file.
3.  Select **Load** from the plugin action menu.
4.  Ensure you have an InDesign document open with the appropriate template pages and script labels set up.

## 💻 Development

- `src/components/Home.tsx`: Main UI and state management.
- `src/util/CalendarUtil.ts`: Core logic for InDesign document manipulation.
- `src/data/calendar.ts`: Data types and JSON schema definitions.

## 💡 Troubleshooting

If you encounter issues during installation:
1.  Delete `node_modules`.
2.  Delete `package-lock.json`.
3.  Run `npm install` again.
4.  Ensure your InDesign document is the active focus when triggering operations.


