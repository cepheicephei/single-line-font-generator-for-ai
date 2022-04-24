/**********************************************************

TITLE
Single-line font generator Adobe Illustrator script


DESCRIPTION
This was created for use with cnc tools,
all characters consist of single stroke paths.
The font is proprietary and free to use.


Author:   Daniel McCharen
Website:  https://www.danielmccharen.com
Date:     24. April, 2022
 
**********************************************************/

var doc = app.activeDocument;

/* ---- WINDOW ---- */

var box = new Window("dialog", "Single-line Font Generator");

var globalPanel = box.add("group");
globalPanel.orientation = "row";

var rightGroup = globalPanel.add("group");
rightGroup.orientation = "column";
rightGroup.alignChildren = "center";
rightGroup.alignment = "top";

var inputPanel = rightGroup.add("panel", undefined, "Input");

var inputText = inputPanel.add("edittext", undefined, "Lorem Ipsum", {
  multiline: true,
  scrollable: true,
});
inputText.size = [300, 100];

var settingsPanel = rightGroup.add("panel", undefined, "Settings");
settingsPanel.orientation = "column";

var distanceSliderPanel = settingsPanel.add(
  "panel",
  undefined,
  "Distance between glyphs (points)"
);
distanceSliderPanel.orientation = "row";

var distanceSlider = distanceSliderPanel.add("slider");

distanceSlider.minvalue = 0;
distanceSlider.maxvalue = 100;

distanceSlider.value = 5;

distanceSlider.preferredSize.width = 195;
distanceSlider.preferredSize.height = 15;

var distanceSliderText = distanceSliderPanel.add(
  "statictext",
  undefined,
  distanceSlider.value
);

distanceSliderText.preferredSize = [50, 20];
distanceSlider.onChanging = function () {
  distanceSliderText.text = this.value.toFixed(0);
};

var sizeSliderPanel = settingsPanel.add("panel", undefined, "Glyph size (mm)");
sizeSliderPanel.orientation = "row";

var sizeSlider = sizeSliderPanel.add("slider");

sizeSlider.minvalue = 1;
sizeSlider.maxvalue = 100;

sizeSlider.value = 5;

sizeSlider.preferredSize.width = 195;
sizeSlider.preferredSize.height = 15;

var sizeSliderText = sizeSliderPanel.add(
  "statictext",
  undefined,
  sizeSlider.value
);

sizeSliderText.preferredSize = [50, 20];
sizeSlider.onChanging = function () {
  sizeSliderText.text = this.value.toFixed(0);
};

/***********************
 * STROKE WEIGHT
 */

var strokeWeightPanel = settingsPanel.add(
  "panel",
  undefined,
  "Stroke weight (mm)"
);
strokeWeightPanel.orientation = "row";

var strokeWeights = [
  "0.1",
  "0.25",
  "0.35",
  "0.5",
  "1",
  "1.25",
  "1.35",
  "1.5",
  "1.75",
  "2",
];

var strokeWeightSelector = strokeWeightPanel.add(
  "dropdownlist",
  undefined,
  strokeWeights
);

strokeWeightSelector.selection = 1;

strokeWeightSelector.preferredSize.width = 195;
strokeWeightSelector.preferredSize.height = 15;

var strokeWeightSelectorText = strokeWeightPanel.add(
  "statictext",
  undefined,
  strokeWeightSelector.selection.text + " mm"
);

strokeWeightSelectorText.preferredSize = [60, 20];
strokeWeightSelector.onChange = function () {
  strokeWeightSelectorText.text = this.selection.text + " mm";
};

var generateBtn = rightGroup.add("button", undefined, "Generate", {
  name: "generate",
});

generateBtn.onClick = function () {
  // generateText(box.inputText.text);
  genText(inputText.text);
  box.close();
};

win = rightGroup.add("group");
win.pnl = win.add("panel", [10, 10, 340, 100], "Progress");
win.pnl.progBarLabel = win.pnl.add("statictext", [20, 20, 320, 35], "0%");
win.pnl.progBar = win.pnl.add("progressbar", [10, 45, 310, 60], 0, 100);

var HyperGroup = rightGroup.add("group");
HyperGroup.orientation = "row";
var learnMoreLabel = HyperGroup.add("statictext", undefined, "Learn more:");
learnMoreLabel.size = [70, 20];
var siteLabel = HyperGroup.add(
  "statictext",
  undefined,
  "https://www.danielmccharen.com"
);
siteLabel.size = [200, 20];

box.show();

/* ---- OUTPUT ---- */

function genText(textToGenerate) {
  var textLayer = doc.layers.add();
  textLayer.name = "Single-line Text";

  var tempLayer = doc.layers.add();
  tempLayer.name = "tempLayer";

  var charMap = tempLayer.groupItems.createFromFile(
    File("C:/Users/danie/Desktop/Letters/charMap.svg")
  );

  var glyphSize = sizeSlider.value * 2.8346456693;
  var progBarStepSize = 100 / textToGenerate.length;

  var startingPosition = {
    x: 0,
    y: 0,
  };
  startingPosition.x = 10;
  startingPosition.y = -10;

  var nextXPosition = startingPosition.x;

  for (var i = 0; i < textToGenerate.length; i++) {
    win.pnl.progBar.value += progBarStepSize;
    win.pnl.progBarLabel.text = Math.floor(win.pnl.progBar.value) + "%";
    box.update();

    if (textToGenerate[i] === " ") {
      nextXPosition += glyphSize + distanceSlider.value;
      continue;
    } else if (textToGenerate[i] === "\n") {
      nextXPosition = startingPosition.x;
      startingPosition.y -= glyphSize + distanceSlider.value;
      continue;
    }

    var _groupItem = charMap.groupItems
      .getByName("charLayer")
      .groupItems.getByName(returnCharacterType(textToGenerate[i]))
      .duplicate(textLayer);

    _groupItem.position = [nextXPosition, startingPosition.y];

    _groupItem.width = glyphSize;
    _groupItem.height = glyphSize;

    var strokeWeight = strokeWeightSelector.selection.text * 2.8346456693;

    var _pathItems = _groupItem.pathItems;
    for (var j = 0; j < _pathItems.length; j++) {
      var currentItem = _pathItems[j];

      // SET STROKE OPTIONS FOR ALL PATHS
      currentItem.strokeCap = StrokeCap.ROUNDENDCAP;
      currentItem.strokeJoin = StrokeJoin.ROUNDENDJOIN;
      currentItem.strokeWidth = strokeWeight;

      // if (dashedCheckbox.value) {
      //   currentItem.strokeDashes = [4, 4];
      // }

      // REMOVE HELPER PATHS (STEP 1)
      if (currentItem.pathPoints.length <= 1) {
        currentItem.remove();
      }
    }

    nextXPosition += glyphSize + distanceSlider.value;
  }
  tempLayer.remove();

  // REMOVE HELPER PATHS (STEP 2)
  for (var x = 0; x < app.activeDocument.pathItems.length; x++) {
    if (app.activeDocument.pathItems[x].length <= 1) {
      app.activeDocument.pathItems[x].remove();
    }
  }
}

/* ---- HELPER FUNCTIONS ---- */

function returnCharacterType(character) {
  if (character.charCodeAt() >= 65 && character.charCodeAt() <= 90) {
    return "uppercase" + character;
  } else if (character.charCodeAt() >= 97 && character.charCodeAt() <= 122) {
    return "uppercase" + character.toUpperCase();
  } else if (character.charCodeAt() >= 48 && character.charCodeAt() <= 57) {
    return "number" + character;
  } else if (
    (character.charCodeAt() >= 33 && character.charCodeAt() <= 47) ||
    (character.charCodeAt() >= 58 && character.charCodeAt() <= 64) ||
    (character.charCodeAt() >= 91 && character.charCodeAt() <= 96) ||
    (character.charCodeAt() >= 123 && character.charCodeAt() <= 128) ||
    (character.charCodeAt() >= 151 && character.charCodeAt() <= 151)
  ) {
    switch (character.charCodeAt()) {
      case 33:
        return "exclamationmark";
      case 34:
        return "quotes";
      case 35:
        return "hashsymbol";
      case 36:
        return "dollarsign";
      case 37:
        return "percentsymbol";
      case 38:
        return "ampersand";
      case 39:
        return "apostrophe";
      case 40:
        return "openparenthesis";
      case 41:
        return "closedparenthesis";
      case 42:
        return "asterisk";
      case 43:
        return "plus";
      case 44:
        return "comma";
      case 45:
        return "dash";
      case 46:
        return "period";
      case 47:
        return "forwardslash";
      case 58:
        return "colon";
      case 59:
        return "semicolon";
      case 60:
        return "less";
      case 61:
        return "equals";
      case 62:
        return "greater";
      case 63:
        return "questionmark";
      case 64:
        return "atsymbol";
      case 91:
        return "openbracket";
      case 93:
        return "closedbracket";
      case 94:
        return "circumflex";
      case 95:
        return "underscore";
      case 123:
        return "openbrace";
      case 124:
        return "bar";
      case 125:
        return "closedbrace";
      case 126:
        return "tilde";
      case 128: // NOT WORKING ?
        return "eurosign";
      case 151: // NOT WORKING ?
        return "emdash";
      default:
        return "notavailable";
    }
  } else {
    return "notavailable";
  }
}

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