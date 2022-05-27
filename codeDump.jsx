/*
 *
 * PREVIEW WIP
 * 
 * 
// var leftGroup = globalPanel.add("group");
// leftGroup.orientation = "column";
// leftGroup.alignChildren = "left";
// leftGroup.alignment = "top";

// var previewHolder = leftGroup.add("panel", undefined, "Preview");
// var previewPanel = previewHolder.add("panel");

// w = previewPanel;
// g = w.graphics;

// var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [1, 1, 1, 1]);
// g.backgroundColor = myBrush;
// var p1 = w.add("panel", undefined, undefined, { borderStyle: "black" });
// p1.preferredSize = [200, 100];

// var gfx = p1.graphics;
// p1.onDraw = function () {
//   var gfx = this.graphics;
//   pen = this.graphics.newPen(
//     this.graphics.PenType.SOLID_COLOR,
//     [0, 0, 0, 1],
//     2
//   );

//   var xyOffset = 4;
//   var glyphWidth = sizeSlider.value;
//   var glyphSpacing = distanceSlider.value;
//   var xPos = xyOffset;
//   var yPos = xyOffset;

//   gfx.newPath();

//   // L
//   gfx.moveTo(xPos, yPos);
//   gfx.lineTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);

//   xPos += glyphWidth + xyOffset + glyphSpacing;

//   // O
//   gfx.moveTo(xPos, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);
//   gfx.lineTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos, yPos);

//   xPos += glyphWidth + xyOffset + glyphSpacing;

//   // R
//   gfx.moveTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth / 2);
//   gfx.lineTo(xPos, yPos + glyphWidth / 2);
//   gfx.moveTo(xPos + glyphWidth / 2, yPos + glyphWidth / 2);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);

//   xPos += glyphWidth + xyOffset + glyphSpacing;

//   // E
//   gfx.moveTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos);
//   gfx.moveTo(xPos, yPos + glyphWidth / 2);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth / 2);
//   gfx.moveTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);

//   xPos += glyphWidth + xyOffset + glyphSpacing;

//   // M
//   gfx.moveTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos, yPos);
//   gfx.lineTo(xPos + glyphWidth / 2, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);

//   xPos = xyOffset;
//   yPos += glyphWidth + xyOffset + glyphSpacing;

//   // I
//   gfx.moveTo(xPos, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos);
//   gfx.moveTo(xPos + glyphWidth / 2, yPos);
//   gfx.lineTo(xPos + glyphWidth / 2, yPos + glyphWidth);
//   gfx.moveTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);

//   xPos += glyphWidth + xyOffset + glyphSpacing;

//   // P
//   gfx.moveTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth / 2);
//   gfx.lineTo(xPos, yPos + glyphWidth / 2);

//   xPos += glyphWidth + xyOffset + glyphSpacing;

//   // S
//   gfx.moveTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth / 2);
//   gfx.lineTo(xPos, yPos + glyphWidth / 2);
//   gfx.lineTo(xPos, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos);

//   xPos += glyphWidth + xyOffset + glyphSpacing;

//   // U
//   gfx.moveTo(xPos, yPos);
//   gfx.lineTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos);

//   xPos += glyphWidth + xyOffset + glyphSpacing;

//   // M
//   gfx.moveTo(xPos, yPos + glyphWidth);
//   gfx.lineTo(xPos, yPos);
//   gfx.lineTo(xPos + glyphWidth / 2, yPos + glyphWidth);
//   gfx.lineTo(xPos + glyphWidth, yPos);
//   gfx.lineTo(xPos + glyphWidth, yPos + glyphWidth);

//   gfx.strokePath(pen);
// };

*/


/**
 * 
 * POTENTIAL SETTINGS STYLING
 * 
 * 
// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "Dialog"; 
    dialog.preferredSize.width = 400; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, {name: "panel1", borderStyle: "gray"}); 
    panel1.text = "Input"; 
    panel1.orientation = "column"; 
    panel1.alignChildren = ["fill","top"]; 
    panel1.spacing = 10; 
    panel1.margins = 10; 
    panel1.alignment = ["fill","top"]; 

var edittext1 = panel1.add('edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}'); 
    edittext1.text = "Edit text"; 
    edittext1.preferredSize.height = 100; 
    edittext1.alignment = ["fill","top"]; 

// PANEL2
// ======
var panel2 = dialog.add("panel", undefined, undefined, {name: "panel2"}); 
    panel2.text = "Settings"; 
    panel2.orientation = "column"; 
    panel2.alignChildren = ["left","top"]; 
    panel2.spacing = 10; 
    panel2.margins = 10; 
    panel2.alignment = ["fill","top"]; 

// GROUP1
// ======
var group1 = panel2.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

// GROUP2
// ======
var group2 = group1.add("group", undefined, {name: "group2"}); 
    group2.preferredSize.width = 174; 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

var statictext1 = group2.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Glyph spacing (pt)"; 

// GROUP3
// ======
var group3 = group1.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 
    group3.alignment = ["left","fill"]; 

// GROUP4
// ======
var group4 = group3.add("group", undefined, {name: "group4"}); 
    group4.preferredSize.width = 120; 
    group4.orientation = "row"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 10; 
    group4.margins = 0; 

var slider1 = group4.add("slider", undefined, undefined, undefined, undefined, {name: "slider1"}); 
    slider1.minvalue = 0; 
    slider1.maxvalue = 100; 
    slider1.value = 50; 
    slider1.preferredSize.width = 120; 
    slider1.alignment = ["left","fill"]; 

// GROUP3
// ======
var statictext2 = group3.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "5"; 

// GROUP5
// ======
var group5 = panel2.add("group", undefined, {name: "group5"}); 
    group5.orientation = "row"; 
    group5.alignChildren = ["left","center"]; 
    group5.spacing = 10; 
    group5.margins = 0; 

// GROUP6
// ======
var group6 = group5.add("group", undefined, {name: "group6"}); 
    group6.preferredSize.width = 174; 
    group6.orientation = "row"; 
    group6.alignChildren = ["left","center"]; 
    group6.spacing = 10; 
    group6.margins = 0; 

var statictext3 = group6.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Glyph size (mm)"; 

// GROUP7
// ======
var group7 = group5.add("group", undefined, {name: "group7"}); 
    group7.orientation = "row"; 
    group7.alignChildren = ["left","center"]; 
    group7.spacing = 10; 
    group7.margins = 0; 
    group7.alignment = ["left","fill"]; 

// GROUP8
// ======
var group8 = group7.add("group", undefined, {name: "group8"}); 
    group8.preferredSize.width = 120; 
    group8.orientation = "row"; 
    group8.alignChildren = ["left","center"]; 
    group8.spacing = 10; 
    group8.margins = 0; 

var slider2 = group8.add("slider", undefined, undefined, undefined, undefined, {name: "slider2"}); 
    slider2.minvalue = 0; 
    slider2.maxvalue = 100; 
    slider2.value = 50; 
    slider2.preferredSize.width = 120; 
    slider2.alignment = ["left","fill"]; 

// GROUP7
// ======
var statictext4 = group7.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "5"; 

// GROUP9
// ======
var group9 = panel2.add("group", undefined, {name: "group9"}); 
    group9.orientation = "row"; 
    group9.alignChildren = ["left","center"]; 
    group9.spacing = 10; 
    group9.margins = 0; 

// GROUP10
// =======
var group10 = group9.add("group", undefined, {name: "group10"}); 
    group10.preferredSize.width = 174; 
    group10.orientation = "row"; 
    group10.alignChildren = ["left","center"]; 
    group10.spacing = 10; 
    group10.margins = 0; 

var statictext5 = group10.add("statictext", undefined, undefined, {name: "statictext5"}); 
    statictext5.text = "Stroke weight (mm)"; 

// GROUP11
// =======
var group11 = group9.add("group", undefined, {name: "group11"}); 
    group11.orientation = "row"; 
    group11.alignChildren = ["left","center"]; 
    group11.spacing = 10; 
    group11.margins = 0; 
    group11.alignment = ["left","fill"]; 

// GROUP12
// =======
var group12 = group11.add("group", undefined, {name: "group12"}); 
    group12.preferredSize.width = 120; 
    group12.orientation = "row"; 
    group12.alignChildren = ["center","center"]; 
    group12.spacing = 10; 
    group12.margins = 0; 

var dropdown1_array = ["Item 1","-","Item 2"]; 
var dropdown1 = group12.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
    dropdown1.selection = 0; 

// GROUP11
// =======
var statictext6 = group11.add("statictext", undefined, undefined, {name: "statictext6"}); 
    statictext6.text = "5"; 

dialog.show();
*/