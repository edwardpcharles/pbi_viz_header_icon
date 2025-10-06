"use strict";

import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

// FIX: Import necessary utilities and classes for settings
import { VisualSettings } from "./settings"; 
import { FormattingSettingsService} from "powerbi-visuals-utils-formattingmodel";

import "./../style/visual.less";


export class Visual implements IVisual {
    private target: HTMLElement;
    private visualSettings: VisualSettings; // Corrected type to match settings.ts
    private formattingSettingsService: FormattingSettingsService; // Service must be managed here
    
    // DOM elements created in constructor for performance
    private container: HTMLElement;
    private textContainer: HTMLElement;
    private titleElement: HTMLElement;
    private subtitleElement: HTMLElement;
    private imageElement: HTMLImageElement;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.formattingSettingsService = new FormattingSettingsService();
    
        // Create root container
        this.container = document.createElement('div');
        this.container.className = 'header-container';
    
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'header-image-container';
    
        this.imageElement = document.createElement('img');
        this.imageElement.className = 'header-image';
        this.imageElement.style.maxWidth = "100%";
        this.imageElement.style.maxHeight = "150px";
        this.imageElement.style.display = "none"; // Start hidden
        imageContainer.appendChild(this.imageElement);
    
        // Create text container (title + subtitle as a unit)
        this.textContainer = document.createElement('div');
        this.textContainer.className = 'header-text-container';
    
        this.titleElement = document.createElement('div');
        this.titleElement.className = 'header-title';
    
        this.subtitleElement = document.createElement('div');
        this.subtitleElement.className = 'header-subtitle';
    
        this.textContainer.appendChild(this.titleElement);
        this.textContainer.appendChild(this.subtitleElement);
    
        // Assemble visual structure
        this.container.appendChild(imageContainer);
        this.container.appendChild(this.textContainer);
        this.target.appendChild(this.container);
    
        this.target.style.overflow = "hidden";
    }
    


    public update(options: VisualUpdateOptions) {
        // Retrieve settings model on every update
        this.visualSettings = this.formattingSettingsService.populateFormattingSettingsModel(
            VisualSettings, 
            options.dataViews[0]
        );

        const titleText = this.visualSettings.textSettings.titleText.value;
        const subtitleText = this.visualSettings.textSettings.subtitleText.value;
        
        const dataView = options.dataViews?.[0];
        const rows = dataView?.table?.rows;
    
        let imageUrl: string | undefined = undefined;
        if (rows && rows.length > 0 && typeof rows[0][0] === "string") {
            imageUrl = rows[0][0]; // First column of first row
        }
    
        if (imageUrl) {
            this.imageElement.src = imageUrl;
            this.imageElement.style.display = "block";
            this.imageElement.alt = "Image from data";
            this.imageElement.onload = () => {
                this.imageElement.style.visibility = "visible";
                this.imageElement.style.opacity = "1";
            };
        } else {
            this.imageElement.style.display = "none";
        }
                // Apply image settings outside the imageUrl check - FIXED CONDITIONS
        const imageHeight = this.visualSettings.imageSettings.imageHeight?.value;
        if (typeof imageHeight === "number") {  // Removed && imageHeight
            this.imageElement.style.height = `${imageHeight}px`;
        }
        
        const imageSpacing = this.visualSettings.imageSettings.marginRight?.value;
        if (typeof imageSpacing === "number") {  // Removed && imageSpacing
            this.imageElement.style.marginRight = `${imageSpacing}px`;
        }

        if (titleText && titleText.trim() !== '') {
            this.titleElement.textContent = titleText;
            this.titleElement.style.display = 'block';
            
            const ts = this.visualSettings.textSettings;
            
            this.titleElement.style.fontSize = `${ts.titlefontSize.value}px`;
            this.titleElement.style.color = ts.titlecolor.value.value;
            this.titleElement.style.fontFamily = ts.titlefontFamily.value; 
            this.titleElement.style.fontWeight = ts.titlebold.value ? 'bold' : 'normal';
            this.titleElement.style.fontStyle = ts.titleitalic.value ? 'italic' : 'normal';
            this.titleElement.style.textDecoration = ts.titleunderline.value ? 'underline' : 'none';

        } else {
            this.titleElement.style.display = 'none';
        }

        // Apply Subtitle (Subheader) Text and Styles
        if (subtitleText && subtitleText.trim() !== '') {
            this.subtitleElement.textContent = subtitleText;
            this.subtitleElement.style.display = 'block';
            
            const ts = this.visualSettings.textSettings; // Alias for readability

            const spacing = this.visualSettings.textSettings.lineSpacing?.value;
            if (typeof spacing === "number") {
                this.subtitleElement.style.marginTop = `${spacing}px`;
            }

            this.subtitleElement.style.fontSize = `${ts.subtitlefontSize.value}px`;
            this.subtitleElement.style.color = ts.subtitlecolor.value.value;
            this.subtitleElement.style.fontFamily = ts.subtitlefontFamily.value;
            this.subtitleElement.style.fontWeight = ts.subtitlebold.value ? 'bold' : 'normal';
            this.subtitleElement.style.fontStyle = ts.subtitleitalic.value ? 'italic' : 'normal';
            this.subtitleElement.style.textDecoration = ts.subtitleunderline.value ? 'underline' : 'none';

        } else {
            this.subtitleElement.style.display = 'none';
        }

        
        const hasTitle = this.titleElement.style.display !== 'none';
        const hasSubtitle = this.subtitleElement.style.display !== 'none';
        const hasImage = this.imageElement.style.display !== 'none';
        
        if (!hasTitle && !hasSubtitle && !hasImage) {
            this.container.style.display = 'none';
        } else {
            this.container.style.display = 'flex';
        }
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        // Note: The visualSettings object must be initialized before this is called.
        return this.formattingSettingsService.buildFormattingModel(this.visualSettings);
    }
}