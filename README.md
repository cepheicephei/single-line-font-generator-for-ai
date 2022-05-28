# Single-line Font Generator for Adobe Illustrator
### A script to generate letter toolpaths for cnc machines

This project was created initially for use with my [homemade pen plotter](https://www.instagram.com/cepheicephei/), to generate text and symbols that consist only of single-line paths. This way, instead of plotting the outlines of a given font, it draws only the letter itself:  
![Artboard 1@3x](https://user-images.githubusercontent.com/64333959/170789235-982ea461-2c60-4c1e-a9be-500af6cdefc7.png)

I created a very rudimentary, proprietary font using very simple, mainly square glyphs (including 26 letters and commonly used symbols and signs). I may update the script later with new fonts to choose from. You could also create your own glyphs and use them with the script.
Here is an example of generated text, after being plotted on paper:  
![Artboard 1](https://user-images.githubusercontent.com/64333959/170790230-c30863aa-d835-4345-8824-665a0ad81a94.png)

---

### Installation
Simply download the following two files:

##### 1. Single-line Font Generator.jsx
> Move the .jsx file into the Illustrator Scripts folder. My Scripts folder location is C:\Program Files\Adobe\Adobe Illustrator 2022\Presets\en_US\Scripts
If you installed Illustrator in a different location, or if you are using OSX, the location will be different. If Illustrator is already running, you may need to restart it to see the script.

##### 2. glyphMap.svg
> Move the .svg file somewhere where it can easily be located. The script will automatically search for it in the Documents folder, but you can specify where you saved it later (when using the script).

---

### Usage
1. Open Illustrator and create an empty (or open an existing) project.
2. Select "File">"Scripts">"Single-line Font Generator".

> Below is a screenshot of the script when opened in Illustrator:  
  
> ![v100_readme2](https://user-images.githubusercontent.com/64333959/170805572-d3cd9666-322d-4ed3-9fb0-ac2ca0706d1f.png)

3. Enter the text you would like to generate in the "Input" box. (*"Save text"* will overwrite the default text)
4. Set the spacing, size and stroke weight for the glyphs. (*"Make all letters uppercase"* is self-explanatory; *"Save settings"* will overwrite the default values)
5. Find the glyphMap.svg file location on your machine. (*"Save file path"* will overwrite the default file path)
6. Hit *"Generate Text"* and see your single-line text as paths in your project! (*"Reset defaults"* will reset all values back to default)

#### If you have any questions or comments, please send me an email at cepheix2@gmail.com

---

### Next steps:
1. Create alternate fonts
2. Add preview functionality

 ✓ Add reset to default settings
