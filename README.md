# Single-line Font Generator for Adobe Illustrator
### A script to generate letter toolpaths for cnc machines

This project was created initially for use with my [homemade pen plotter](https://www.instagram.com/cepheicephei/), to generate text and symbols that consist only of single-line paths. This way, instead of plotting the outlines of a given font, it draws only the letter itself:  
![Artboard 1@3x](https://user-images.githubusercontent.com/64333959/170789235-982ea461-2c60-4c1e-a9be-500af6cdefc7.png)

I created a very rudimentary, proprietary font using very simple, mainly square glyphs (including 26 letters and commonly used symbols and signs). I may update the script later with new fonts to choose from. You could also create your own glyphs and use them with the script.
Here is an example of generated text, after being plotted on paper:  
![Artboard 1](https://user-images.githubusercontent.com/64333959/170790230-c30863aa-d835-4345-8824-665a0ad81a94.png)

### Installation
Simply download the following two files:

##### 1. Single-line Font Generator.jsx
Move the .jsx file into the Illustrator Scripts folder. My Scripts folder location is C:\Program Files\Adobe\Adobe Illustrator 2022\Presets\en_US\Scripts
If you installed Illustrator in a different location, or if you are using OSX, the location will be different.

##### 2. glyphMap.svg
Move the .svg file somewhere where it can easily be located. The script will automatically search for it in the Documents folder, but you can specify where you saved it later (when using the script).


![v100_readme](https://user-images.githubusercontent.com/64333959/170783868-570152a8-594c-4c22-9d73-5a126d603917.png)
