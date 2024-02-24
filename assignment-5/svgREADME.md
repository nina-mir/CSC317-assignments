<img src="https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-5/sample_banner.svg" width="60%"></img>

# An SVG drawing guide

## 1. Intro
Assignment-5 asks you to create banner image(s), animated graphics and any SVG-related graphics or art that you wish. You are only allowed to use SVG code inside the body tag of your ```HTML``` files. Using ```CSS``` or ```JavaScript``` is not allowed, since this is an ```HTML``` only assignment.

> [!NOTE]
> If your artwork crucially depends on using ```CSS/JS``` code, you are welcome to DM the instructor on **Discord** with a jsfiddle example of your artwork for your request to be considered.

## 2. SVG basic shapes
Rectangle, circle, ellipse, line, polyline,  polygon and path are the basic shapes of SVG. Each of these shapes has an element associated with it. These elements need to be inside a ```svg``` tag, as in each of these shapes would be a child of parent SVG element.

For example in the following code snippet that is a greatly simplified version of the banner graphics SVG file, you see two ```<rect>``` elements, two ```<circle>``` elements (one has a closing tag and one is an empty element!), one ```<polygone>``` element, one ```<text>``` element, a group ```<g>``` element that encloses a ```<path>``` element and a ```<circle>``` element. There is an ```<animateMotion>``` nested in that ```<circle>``` element too. To see the code used to create the banner image on this document, please click [here](https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-5/sample_banner.svg).
```
<svg>
    <rect/>
    <circle/>
    <rect/>
    <polygon/>
    <text>
      Willkommen!
    </text>
    <g>
        <path/>
    `   <circle>
        <animateMotion/>
      </circle>
    </g>
</svg>
```
## 3. Animation 
SVG animation can be achieved using the ```<animate>```, ```<animateMotion>``` and ```<animateTransform>``` elements. 
The following image is achieved using ```<animateMotion>```. More info is on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion).
You are encouraged to read MDN's explanation of the other two SVG elements on its [SVG Element Reference pages](https://developer.mozilla.org/en-US/docs/Web/SVG/Element#a).

<img src="https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-5/animation_example.svg" width="60%"></img>


## 4. Examples and Tutorials 
To help you getting started with SVG, the following sources are highly recommended: 
- [W3C's SVG Primer](https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html) (It has many examples with code/graphics and detailed explanation.)
- SVG Tutorial artciles on [MDN](https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html)

  _Specifically the following articles are recommended for this assignment:_
    - [Getting started](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started)
    - [Positions](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions)
    - [Basic Shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)
    - [Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    - [Fills and Strokes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes)
    - [Gradients in SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients)


