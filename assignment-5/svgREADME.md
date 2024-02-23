![banner](https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-5/sample_banner.svg)

# An SVG drawing guide

## 1. Intro
Assignment-5 asks you to create banner image(s), animated graphics and any SVG-related graphics or art that you wish. In order to do so, you are only allowed to use SVG code inside the body tag of your HTML files. Using CSS or JavaScript is not allowed.

> [!NOTE]
> If your artwork crucially depends on using CSS or JS code, you are welcome to DM the instructor on **Discord** with a jsfiddle example of your artwork to seek permission about using CSS/JS in this assignment.

## SVG basic shapes
Rectangle, circle, ellipse, line, polyline,  polygon, path are the basic shapes of SVG. Each of these shapes has an element associated with it. These elements need to be inside a svg tag, as in each of these shapes would be a child of parent SVG element.

For example in the following code that is of the banner graphics on this file, you will see 


```
<svg width="100%" height="100%">
    <rect width="100%" height="100%" fill="red" />
    <circle cx="100%" cy="100%" r="150" fill="blue" stroke="black" />
    <circle cx="20%" cy="20%" r="50" fill="black" stroke="black" />
    <polygon points="120,0 240,225 0,225" fill="#A1DD70" />
    <text 
      x="50" y="100" 
      font-family="Verdana" 
      font-size="55" 
      fill="yellow" 
      stroke="black" 
      stroke-width="2"
    >
      Wilkommen!
    </text>
</svg>
```

