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

var settingsLoadFileDefault;
settingsLoadFileDefault = new File(
  "~/Documents/single-line font generator settings.settings"
);

var defaultDirectory = "~/Documents/glyphMap.svg";
var defaultText = "The five boxing wizards jump quickly.\nSphinx of black quartz, judge my vow.\nHow vexingly quick daft zebras jump!";
var defaultSettings = "5,5,2,1"

if (settingsLoadFileDefault.exists) {
  settingsLoadFileDefault.open("r");

  var settingLoadDefault = settingsLoadFileDefault.read();
  var mySettingsDefault = settingLoadDefault.split("|");

  if (mySettingsDefault[0]) {
    defaultDirectory = mySettingsDefault[0];
  }
  if (mySettingsDefault[1]) {
    defaultText = mySettingsDefault[1];
  }
  if (mySettingsDefault[2]) {
    defaultSettings = mySettingsDefault[2];
  }

  settingsLoadFileDefault.close();
}

var defaultSettingsSplit = defaultSettings.split(",");

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
inputPanel.orientation = "column";
inputPanel.alignChildren = "left";

var inputText = inputPanel.add(
  "edittext",
  undefined,
  defaultText,
  {
    multiline: true,
    scrollable: true,
  }
);
inputText.size = [300, 100];

var saveInputTextCheckbox = inputPanel.add("checkbox", undefined, "Save text");
saveInputTextCheckbox.value = true;

var settingsPanel = rightGroup.add("panel", undefined, "Settings");
settingsPanel.orientation = "column";
settingsPanel.alignChildren = "left";

var distanceSliderPanel = settingsPanel.add(
  "panel",
  undefined,
  "Glyph spacing (pt)"
);
distanceSliderPanel.orientation = "row";

var distanceSlider = distanceSliderPanel.add("slider");

distanceSlider.minvalue = 0;
distanceSlider.maxvalue = 100;

distanceSlider.value = defaultSettingsSplit[0];

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

sizeSlider.value = defaultSettingsSplit[1];

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

strokeWeightSelector.selection = defaultSettingsSplit[2].toString();

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

var allUpperCaseCheckbox = settingsPanel.add(
  "checkbox",
  undefined,
  "Make all letters uppercase"
);

var defaultUppercase = +defaultSettingsSplit[3];
allUpperCaseCheckbox.value = defaultUppercase;

var saveSettingsCheckbox = settingsPanel.add("checkbox", undefined, "Save settings");
saveSettingsCheckbox.value = true;

var glyphFilePanel = rightGroup.add("panel", undefined, "Glyph file location", {
  borderStyle: "sunken",
});
glyphFilePanel.orientation = "column";
glyphFilePanel.alignChildren = ["fill", "left"];
glyphFilePanel.size = [330, 100];

//DIRECTORY
var directoryGroup = glyphFilePanel.add("group");
directoryGroup.orientation = "row";
directoryGroup.alignChildren = "left";

var directoryLabel = directoryGroup.add("statictext", undefined, "File:");

// defaultDirectory = "~/Desktop/Letters/glyphMap.svg";

var directoryText = directoryGroup.add(
  "edittext",
  undefined,
  defaultDirectory,
  { readonly: true }
);
directoryText.characters = 16;

var directoryButton = directoryGroup.add("button", undefined, "...", {
  name: "Dir",
});
directoryButton.size = [25, 25];
directoryButton.onClick = function () {
  directoryText.text = File.openDialog("Select the glyphMap.svg file.");
};

var saveDefaultGroup = glyphFilePanel.add("group");
saveDefaultGroup.orientation = "row";
saveDefaultGroup.alignChildren = "center";

var saveDefault = saveDefaultGroup.add("checkbox", undefined, "Save file path");
saveDefault.value = true;

var btnGroup = rightGroup.add("group");
btnGroup.orientation = "row";
btnGroup.alignChildren = "center";

var generateBtn = btnGroup.add("button", undefined, "Generate Text", {
  name: "generate",
});

generateBtn.onClick = function () {
  genText(inputText.text);
};

// var generateAlphabetBtn = btnGroup.add("button", undefined, "Generate Alphabet", {
//   name: "generate",
// });

// generateAlphabetBtn.onClick = function () {
//   genText("abcdefghijklm\nnopqrstuvwxyz");
// };

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
  try {
    var textLayer = doc.layers.add();
    textLayer.name = "Single-line Text";

    var tempLayer = doc.layers.add();
    tempLayer.name = "tempLayer";

    var charMap = tempLayer.groupItems.createFromFile(File(directoryText.text));

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

    var settingsSaveFileDefault;
    settingsSaveFileDefault = new File(
      "~/Documents/single-line font generator settings.settings"
    );

    // REMOVE SETTINGS IF UNCHECKED !!

    settingsSaveFileDefault.open("w");
    if (saveDefault.value) {
      var settingSaveDefault = directoryText.text + "|";
      settingsSaveFileDefault.write(settingSaveDefault);
    }
    if (saveInputTextCheckbox.value) {
      var inputText = textToGenerate + "|";
      settingsSaveFileDefault.write(inputText);
    }
    if (saveSettingsCheckbox.value) {
      var settingsSaveSettings = distanceSlider.value.toFixed() + "," + sizeSlider.value.toFixed() + "," + strokeWeightSelector.selection + "," + +allUpperCaseCheckbox.value + "|";
      settingsSaveFileDefault.write(settingsSaveSettings);
    }
    settingsSaveFileDefault.close();

    box.close();
  } catch (error) {
    tempLayer.remove();
    textLayer.remove();
    win.pnl.progBar.value = 0;
    win.pnl.progBarLabel.text = "0%";
    Window.alert("Glyph map not found.\nSelect the correct glyphMap.svg file.");
  }
}

/* ---- HELPER FUNCTIONS ---- */

function returnCharacterType(character) {
  if (character.charCodeAt() >= 65 && character.charCodeAt() <= 90) {
    return "uppercase" + character;
  } else if (character.charCodeAt() >= 97 && character.charCodeAt() <= 122) {
    if (allUpperCaseCheckbox.value) {
      return "uppercase" + character.toUpperCase();
    } else {
      return character + "";
    }
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
