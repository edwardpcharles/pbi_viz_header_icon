import {
    formattingSettings,
    FormattingSettingsService
} from "powerbi-visuals-utils-formattingmodel";
import powerbi from "powerbi-visuals-api";


export class ImageSettings extends formattingSettings.SimpleCard {
    public imageHeight = new formattingSettings.Slider({
        name: "imageHeight",
        displayName: "Image Height (px)",
        value: 50,
        options: {
            minValue: {
                value: 10,
                type: powerbi.visuals.ValidatorType.Min
            },
            maxValue: {
                value: 500,
                type: powerbi.visuals.ValidatorType.Max
            }
        }
    }
    );

    public marginRight = new formattingSettings.Slider({
        name: "marginRight",
        displayName: "Margin Right (px)",
        value: 0,
        options: {
            minValue: {
                value: -100,
                type: powerbi.visuals.ValidatorType.Min
            },
            maxValue: {
                value: 100,
                type: powerbi.visuals.ValidatorType.Max
            }
        }
    }
    );

    public name = "imageSettings";
    public displayName = "Image";

    public slices: formattingSettings.Slice[] = [
        this.imageHeight,
        this.marginRight
    ];
}

export class TextSettings extends formattingSettings.SimpleCard {
    // Title controls
    public titleText = new formattingSettings.TextInput({
        name: "titleText",
        displayName: "Line 1 Text",
        placeholder: "Enter line 1 text...",
        value: "",
        instanceKind: powerbi.VisualEnumerationInstanceKinds.ConstantOrRule
    });

    public titlefontFamily: formattingSettings.FontPicker = new formattingSettings.FontPicker({
        name: "titlefontFamily", // <-- CORRECTED NAME
        value: "Arial, sans-serif"
    });

    public titlefontSize: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
        name: "titlefontSize", // <-- CORRECTED NAME
        value: 40
    });
    
    public titlebold: formattingSettings.ToggleSwitch = new formattingSettings.ToggleSwitch({
        name: "titlebold", // <-- CORRECTED NAME
        value: true
    });
    
    public titleitalic: formattingSettings.ToggleSwitch = new formattingSettings.ToggleSwitch({
        name: "titleitalic", // <-- CORRECTED NAME
        value: false
    });
    
    public titleunderline: formattingSettings.ToggleSwitch = new formattingSettings.ToggleSwitch({
        name: "titleunderline", // <-- CORRECTED NAME
        value: false
    });

    public titlefont: formattingSettings.FontControl = new formattingSettings.FontControl({
        name: "titlefont",   // must be unique within the same object
        displayName: "Font",
        fontFamily: this.titlefontFamily,
        fontSize: this.titlefontSize,
        bold: this.titlebold,           //optional
        italic: this.titleitalic,       //optional
        underline: this.titleunderline  //optional
    });

    public titlecolor: formattingSettings.ColorPicker = new formattingSettings.ColorPicker({
        name: "titlecolor", // same as capabilities property name
        displayName: "Color",
        value: { value: "#000000" }
    });

    // Subheader controls
    public subtitleText = new formattingSettings.TextInput({
        name: "subtitleText",
        displayName: "Line 2 Text",
        placeholder: "Enter line 2 text...",
        value: "",
        instanceKind: powerbi.VisualEnumerationInstanceKinds.ConstantOrRule
    });
    
    public subtitlefontFamily: formattingSettings.FontPicker = new formattingSettings.FontPicker({
        name: "subtitlefontFamily", // <-- CORRECTED NAME
        value: "Arial, sans-serif"
    });
    public subtitlefontSize: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
        name: "subtitlefontSize", // <-- CORRECTED NAME
        value: 20
    });

    public subtitlebold: formattingSettings.ToggleSwitch = new formattingSettings.ToggleSwitch({
        name: "subtitlebold", // <-- CORRECTED NAME
        value: false
    });

    public subtitleitalic: formattingSettings.ToggleSwitch = new formattingSettings.ToggleSwitch({
        name: "subtitleitalic", // <-- CORRECTED NAME
        value: false
    });

    public subtitleunderline: formattingSettings.ToggleSwitch = new formattingSettings.ToggleSwitch({
        name: "subtitleunderline", // <-- CORRECTED NAME
        value: false
    });

    public subtitlefont: formattingSettings.FontControl = new formattingSettings.FontControl({
        name: "subtitlefont",   // must be unique within the same object
        displayName: "Font",
        fontFamily: this.subtitlefontFamily,
        fontSize: this.subtitlefontSize,
        bold: this.subtitlebold,           //optional
        italic: this.subtitleitalic,       //optional
        underline: this.subtitleunderline //optional
    });

    public subtitlecolor: formattingSettings.ColorPicker = new formattingSettings.ColorPicker({
        name: "subtitlecolor", // same as capabilities property name
        displayName: "Color",
        value: { value: "#000000" }
    });

    public lineSpacing = new formattingSettings.Slider({
        name: "lineSpacing",
        displayName: "Line Spacing (px)",
        value: 0,
        options: {
            minValue: {
                value: -100,
                type: powerbi.visuals.ValidatorType.Min
            },
            maxValue: {
                value: 100,
                type: powerbi.visuals.ValidatorType.Max
            }
        }
    }
    );

    // Card config
    public name = "textSettings";
    public displayName = "Text";

    public slices: formattingSettings.Slice[] = [
        this.titleText,
        this.titlefont,
        this.titlecolor,
        this.subtitleText,
        this.subtitlefont,
        this.subtitlecolor,
        this.lineSpacing
    ];

}

// Main settings model to register all cards
export class VisualSettings extends formattingSettings.Model {
    public imageSettings = new ImageSettings();
    public textSettings = new TextSettings();

    // All cards to show in the format pane
    public cards = [this.imageSettings, this.textSettings];
}
