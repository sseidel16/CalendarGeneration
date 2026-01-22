export type CalendarData = {
    year: string;
    months: MonthData[];
}

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

export type MonthData = {
    name: string[]; // [english, greek]
    grid: GridData;
}

export type GridData = BoxData[][]; // always 5 by 7

export type BoxData = EmptyBox | NoteBox | SplitBox | DateBox;

export type EmptyBox = {
    type: 'EMPTY';
};

/**
 * Note boxes show the note for an indicator found in a date box
 */
export type NoteBox = {
    type: 'NOTE';
    note: string; // symbol indicator like * or ** or +
    text: string[]; // [english, greek]
};

/**
 * Split boxes are used occasionally for dates 30 and 31 when they spill into a 6th row
 */
export type SplitBox = {
    type: 'SPLIT';
    top: DateBox;
    bottom: DateBox;
};

export type DateBox = {
    type: 'DATE';
    newDate: number; // new calendar date
    oldDate: number; // old calendar date
    background: 'STANDARD' | 'FASTING'; // any fasting rule beyond no meat
    moon: 'NONE' | 'NEW' | 'FIRST' | 'FULL' | 'LAST'; // the moon phase
    fasting: 'NONE' | 'DAIRY' | 'FISH' | 'OIL' | 'STRICT';
    note?: string; // note indicator like *, links to a NoteBox in the same month
    mainText: {
        feast?: string[]; // [english, greek]
        saint?: string[]; // [english, greek]
        note?: string[]; // small note, longer notes go in the NoteBox, linked from top-level note indicator
    };
    lowerText: {
        tone?: string; // tone of the week, only for Sundays, ex: 1st Tone, Plagal 2nd Tone, Grave Tone, etc
        readings: string[]; // bible readings
    };
};

export const calendarData: CalendarData = {
    "year": "2026",
    "months": [
        {
            "name": [
                "January",
                "Ιανουάριος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "NOTE",
                        "note": "*",
                        "text": [
                            "Some traditions allow for no fasting on this day.",
                            "Κατ’ ἄλλη ἐκδοχὴ δὲν ἔχει νηστεία αὐτὴ τὴν ἡμέρα."
                        ]
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 19,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 20,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "OIL",
                        "note": "*",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 21,
                        "background": "STANDARD",
                        "moon": "FULL",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 22,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 23,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 24,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 25,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "OIL",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 26,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 27,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 28,
                        "background": "STANDARD",
                        "moon": "LAST",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 29,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 30,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 31,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "STANDARD",
                        "moon": "NEW",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "STANDARD",
                        "moon": "FIRST",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "OIL",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "OIL",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 31,
                        "oldDate": 18,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ]
            ]
        },
        {
            "name": [
                "February",
                "Φεβρουάριος"
            ],
            "grid": [
                [
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 19,
                        "background": "STANDARD",
                        "moon": "FULL",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 20,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 21,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 22,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "note": "*",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 23,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 24,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "note": "*",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 25,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 26,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 27,
                        "background": "STANDARD",
                        "moon": "LAST",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 28,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 29,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 30,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 31,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "FASTING",
                        "moon": "NEW",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "OIL",
                        "note": "*",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ],
                            "note": [
                                "No Liturgy",
                                "Ἄνευ Λειτουργίας"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "OIL",
                        "note": "*",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ],
                            "note": [
                                "No Liturgy",
                                "Ἄνευ Λειτουργίας"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ],
                            "note": [
                                "Beginning of Lent - Clean Monday",
                                "Ἀρχὴ νηστείας - Καθαρὰ Δευτέρα"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "FASTING",
                        "moon": "FIRST",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ],
                            "note": [
                                "1st Salutations",
                                "Α΄ Χαιρετισμοί"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "OIL",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "NOTE",
                        "note": "*",
                        "text": [
                            "Some traditions allow for no fasting on this day.",
                            "Κατ’ ἄλλη ἐκδοχὴ δὲν ἔχει νηστεία αὐτὴ τὴν ἡμέρα."
                        ]
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    }
                ]
            ]
        },
        {
            "name": [
                "March",
                "Μάρτιος"
            ],
            "grid": [
                [
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 16,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 17,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 18,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 19,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 20,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 21,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 22,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 23,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 24,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 25,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 26,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 27,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 28,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 31,
                        "oldDate": 18,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    }
                ]
            ]
        },
        {
            "name": [
                "April",
                "Απρίλιος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 19,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 20,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 21,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 22,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 23,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 24,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 25,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 26,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 27,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 28,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 29,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 30,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 31,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    }
                ]
            ]
        },
        {
            "name": [
                "May",
                "Μάιος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 18,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 19,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 20,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 21,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 22,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 23,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 24,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 25,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 26,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 27,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 28,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 29,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 30,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "SPLIT",
                        "top": {
                            "type": "DATE",
                            "newDate": 24,
                            "oldDate": 11,
                            "background": "STANDARD",
                            "moon": "NONE",
                            "fasting": "NONE",
                            "mainText": {
                                "feast": [
                                    "First Sunday of Matthew",
                                    "Ε΄ Ματθαίου"
                                ],
                                "saint": [
                                    "Stephen the Protomartyr",
                                    "Στεφάνου τοῦ Πρωτομάρτυρος"
                                ]
                            },
                            "lowerText": {
                                "tone": "First Tone",
                                "readings": [
                                    "2 Timothy 2:1-10",
                                    "John 15:17-16:2"
                                ]
                            }
                        },
                        "bottom": {
                            "type": "DATE",
                            "newDate": 31,
                            "oldDate": 18,
                            "background": "STANDARD",
                            "moon": "NONE",
                            "fasting": "NONE",
                            "mainText": {
                                "feast": [
                                    "First Sunday of Matthew",
                                    "Ε΄ Ματθαίου"
                                ],
                                "saint": [
                                    "Stephen the Protomartyr",
                                    "Στεφάνου τοῦ Πρωτομάρτυρος"
                                ]
                            },
                            "lowerText": {
                                "tone": "First Tone",
                                "readings": [
                                    "2 Timothy 2:1-10",
                                    "John 15:17-16:2"
                                ]
                            }
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ]
            ]
        },
        {
            "name": [
                "June",
                "Ιούνιος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 19,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 20,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 21,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 22,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 23,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 24,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 25,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 26,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 27,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 28,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 29,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 30,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 31,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    }
                ]
            ]
        },
        {
            "name": [
                "July",
                "Ιούλιος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 18,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 19,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 20,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 21,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 22,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 23,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 24,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 25,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 26,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 27,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 28,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 29,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 30,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 31,
                        "oldDate": 18,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "EMPTY"
                    }
                ]
            ]
        },
        {
            "name": [
                "August",
                "Αύγουστος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 19,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "OIL",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 20,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 21,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 22,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 23,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 24,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 25,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 26,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 27,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 28,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 29,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 30,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 31,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "SPLIT",
                        "top": {
                            "type": "DATE",
                            "newDate": 23,
                            "oldDate": 10,
                            "background": "STANDARD",
                            "moon": "NONE",
                            "fasting": "NONE",
                            "mainText": {
                                "feast": [
                                    "First Sunday of Matthew",
                                    "Ε΄ Ματθαίου"
                                ],
                                "saint": [
                                    "Stephen the Protomartyr",
                                    "Στεφάνου τοῦ Πρωτομάρτυρος"
                                ]
                            },
                            "lowerText": {
                                "tone": "First Tone",
                                "readings": [
                                    "2 Timothy 2:1-10",
                                    "John 15:17-16:2"
                                ]
                            }
                        },
                        "bottom": {
                            "type": "DATE",
                            "newDate": 30,
                            "oldDate": 17,
                            "background": "STANDARD",
                            "moon": "NONE",
                            "fasting": "NONE",
                            "mainText": {
                                "feast": [
                                    "First Sunday of Matthew",
                                    "Ε΄ Ματθαίου"
                                ],
                                "saint": [
                                    "Stephen the Protomartyr",
                                    "Στεφάνου τοῦ Πρωτομάρτυρος"
                                ]
                            },
                            "lowerText": {
                                "tone": "First Tone",
                                "readings": [
                                    "2 Timothy 2:1-10",
                                    "John 15:17-16:2"
                                ]
                            }
                        }
                    },
                    {
                        "type": "SPLIT",
                        "top": {
                            "type": "DATE",
                            "newDate": 24,
                            "oldDate": 11,
                            "background": "STANDARD",
                            "moon": "NONE",
                            "fasting": "NONE",
                            "mainText": {
                                "saint": [
                                    "Stephen the Protomartyr",
                                    "Στεφάνου τοῦ Πρωτομάρτυρος"
                                ]
                            },
                            "lowerText": {
                                "readings": [
                                    "2 Timothy 2:1-10",
                                    "John 15:17-16:2"
                                ]
                            }
                        },
                        "bottom": {
                            "type": "DATE",
                            "newDate": 31,
                            "oldDate": 18,
                            "background": "STANDARD",
                            "moon": "NONE",
                            "fasting": "NONE",
                            "mainText": {
                                "saint": [
                                    "Stephen the Protomartyr",
                                    "Στεφάνου τοῦ Πρωτομάρτυρος"
                                ]
                            },
                            "lowerText": {
                                "readings": [
                                    "2 Timothy 2:1-10",
                                    "John 15:17-16:2"
                                ]
                            }
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ]
            ]
        },
        {
            "name": [
                "September",
                "Σεπτέμβριος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 19,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 20,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 21,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 22,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 23,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 24,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 25,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 26,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 27,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 28,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 29,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 30,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 31,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    }
                ]
            ]
        },
        {
            "name": [
                "October",
                "Οκτώβριος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 18,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 19,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 20,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 21,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 22,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 23,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 24,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 25,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 26,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 27,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 28,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 29,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 30,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 31,
                        "oldDate": 18,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ]
            ]
        },
        {
            "name": [
                "November",
                "Νοέμβριος"
            ],
            "grid": [
                [
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 19,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 20,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 21,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 22,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 23,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 24,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 25,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 26,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 27,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 28,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 29,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 30,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 31,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    }
                ]
            ]
        },
        {
            "name": [
                "December",
                "Δεκέμβριος"
            ],
            "grid": [
                [
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "DATE",
                        "newDate": 1,
                        "oldDate": 18,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 2,
                        "oldDate": 19,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 3,
                        "oldDate": 20,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 4,
                        "oldDate": 21,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 5,
                        "oldDate": 22,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 6,
                        "oldDate": 23,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 7,
                        "oldDate": 24,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 8,
                        "oldDate": 25,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 9,
                        "oldDate": 26,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 10,
                        "oldDate": 27,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 11,
                        "oldDate": 28,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 12,
                        "oldDate": 29,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 13,
                        "oldDate": 30,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 14,
                        "oldDate": 1,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 15,
                        "oldDate": 2,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 16,
                        "oldDate": 3,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 17,
                        "oldDate": 4,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 18,
                        "oldDate": 5,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 19,
                        "oldDate": 6,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 20,
                        "oldDate": 7,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 21,
                        "oldDate": 8,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 22,
                        "oldDate": 9,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 23,
                        "oldDate": 10,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 24,
                        "oldDate": 11,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 25,
                        "oldDate": 12,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 26,
                        "oldDate": 13,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "STRICT",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    }
                ],
                [
                    {
                        "type": "DATE",
                        "newDate": 27,
                        "oldDate": 14,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "feast": [
                                "First Sunday of Matthew",
                                "Ε΄ Ματθαίου"
                            ],
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "tone": "First Tone",
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 28,
                        "oldDate": 15,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 29,
                        "oldDate": 16,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "DAIRY",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 30,
                        "oldDate": 17,
                        "background": "FASTING",
                        "moon": "NONE",
                        "fasting": "NONE",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "DATE",
                        "newDate": 31,
                        "oldDate": 18,
                        "background": "STANDARD",
                        "moon": "NONE",
                        "fasting": "FISH",
                        "mainText": {
                            "saint": [
                                "Stephen the Protomartyr",
                                "Στεφάνου τοῦ Πρωτομάρτυρος"
                            ]
                        },
                        "lowerText": {
                            "readings": [
                                "2 Timothy 2:1-10",
                                "John 15:17-16:2"
                            ]
                        }
                    },
                    {
                        "type": "EMPTY"
                    },
                    {
                        "type": "EMPTY"
                    }
                ]
            ]
        }
    ]
};
