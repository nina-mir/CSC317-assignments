# Assignment 5
Total marks: 100
Focus: Using HTML to create a website and deplying it to the internet using [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
## Deliverables
A PDF report submitted to Canvas.
- The PDF file must include **student-name | SFSU-ID | Assignment 5 | your-GitHub-ID** in the header section.
- The body of your PDF report must contain a hyperlink to the GitHub repo.
- The body of your PDF report must contain the URL to your deployed website.
## Your Repo Structure
It is required for your repo to have the following file structure. 
```graphql
assignment-5-repo 
  ├─ index.html - # Entry point for your website must be named index.html
  ├─ views/  
  │  ├─ two.html 
  │  └─ three.html
  ├─ README.md - # Include references to any articles on MDN or elsewhere that you used for this assignment. 
  └─ resources/ 
     ├─ favicon.svg - # favicon used in your project
     └─ Everything else... - # All your SVG image files that you create will be in in this directory
```
> [!WARNING]
> If your submitted report and/or the structure of your GitHub repo for this assignment are not prepared accrding to the abovementioned instructions, the maximum grade for your submission will be 80%.
## Instructions
### index.html
#### Required features: 
- A custom banner image created by you using basic SVG elements.
    - The banner width must be the full width of the screen.
    - The banner height has no restrictions.
    - The banner image must at the top of the page.
    - The banner image must, at least, include one of each of the following elements:
        - ```<circle>```
        - ```<rect>```
        - ```<polygone>```
        - ```<path>```
  - You have two options to add your SVG drawings to your ```html``` files:
      -  using SVG code directly within ```<body></body>``` element.
      -  using ```<img />``` element to reference a ```SVG``` image file located in the ```resources/``` folder.
      -  More info is found on [MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web).
-  ```<nav class="menue"></nav>``` element following the banner image.
    -  This element contains an ```<ul></ul>``` element that contains list items that are each a hyperlink to the home page(```./index.html```), page two(```/views/two.html```) and page three(```views/three.html```) of your website. More info and examples can be found [here](https://developer.mozilla.org/en-US/play).
-  ```<h1></h1>``` element containing the following text: `Assignment 5`. This element is right after the ```nav``` element.
-  ```<h2 class="css-question"></h2>``` element containing the following text: `How to Apply CSS to HTML`. This element is placed right after the ```h1``` element. 
-  ```<p class="css-question"></p>``` element containing information on how to include an **external** CSS file in an ```html``` file with **an example**. This element follows the ```h2``` element above.
    -  Any _code_ used in your answer **must be** within a [```<code></code>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) or [```<pre></pre>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre) elements. [This](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured) MDN article explains how to apply external CSS to ```html```.
- ```<h2 class="js-question"></h2>``` element containing the following text: `How to Use Javascript in a Webpage`. This element is placed right after the above ```<p></p>``` element.
- ```<p class="js-question"></p>``` that follows the above ```h2``` element. This paragraph element contains the following information:
    - How to link to an **external** Javascript file with an example.
    - How to write Javascript code within an ```html``` file with an example.
    - As mentioned earlier, any _code_ used in your answers **must be** within a [```<code></code>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) or [```<pre></pre>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre) elements.
    - [This](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage) MDN article explains how to import JS code into a webpage. 
> [!NOTE]
> You are not asked to use any software to create SVG artwork. However, you are allowed to do so.
> For a list of tools to create SVG art, please click [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Tools_for_SVG)

### two.html
#### General Info
On this page, you are asked to create a table using HTML ```<table></table>``` element. The content of this table is your top three coding resources that you have found very useful in your computer science journey. These resources can be of any media: social media channels, books, blogs, websites, Discord channels, etc.

You may find this [MDN article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics) very useful for this pat of the assignment.

If you happen to have no favorite coding resourse, find some for this assignment, please.😺

#### Required features:
-  A custom banner page at the top of the page with the same requirements specified for the banner image in the [previous secion](https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-5/READme.md#indexhtml).
    -  You are allowed to use the same banner page that yu created for ```index.html``` webpage.
    -  Also, you are allowed to create another custom banner page, if you want to create more art!
    -  Please, keep in mind that **it is required that all banner images be of the same width and height on all pages of this website**.
-   ```<nav></nav>``` element with the same specifications as in ```index.html```.
-  ```<h1></h1>``` element with the following text: `Favorite Coding Resources`.
-   ```<table></table>``` element with at least 4 rows and 2 columns and a [```<caption></caption>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption). The first row is the heading of this table. Hint: you need to use [```<thead></thead>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead) element to create a table heading row.
-    For this basic HTML table, you are required to use ```<table></table>```, ```<caption></caption>```, ```<tbody></tbody>```,```<tr></tr>```, ```<td></td>``` elements.

For reference, the following is an example of a table with three rows. You need to create a table with four rows. 
|  Coding Resource | Link |
| --- | --- |
| Mozilla Developer Network | https://developer.mozilla.org/en-US/docs/Web |
| DigitalOcean Tutorials | https://www.digitalocean.com/community/tutorials 

### three.html
#### General Info
On this page, you are required to create an SVG animation using ```<animateMotion></animateMotion>```. 


Hint: You  will need ```<path></path>``` and ```<circle></circle>``` elements too. You are encouraged to view the code of a [sample SVG animation file in this directory](https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-5/animation_example.svg).
#### Required features:
- A custom banner page as explained in the previous secion.
-   ```<nav></nav>``` element with the same specifications as in ```index.html```.
- ```<h1></h1>``` element with the following text: `SVG Animation is easy!`
- ```<img></img>```.element referencing the SVG file of the animation that you have created:
    - The animation that you will create is of a small red circle traversing a perimeter of a square. More info can be found [here](./svgREADME.md)
    - The animation needs to be a seperate file named ```page-three.svg``` and located in the ```\resources\``` folder of your final repo.
    - The following is a reference graphic for this part of the assignment.

<p align="left">  
  <img src="https://github.com/nina-mir/CSC317-assignments/blob/35bc85209121f16a9ccd41e9aa5d0b5be774a2a5/assignment-5/svgAnimationCSC317_HW_5.gif" width="25%"></img>
</p>

#### Optional feature:
-  You are encouraged to include a personal SVG artwork after the required animation on this page.
-  ***The top three SVG artwork, chosen by the instructor, will be featured on CSC317-04 main Canvas page for the entirety of March 2024.***
### favicon.svg
#### General Info
Per [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Favicon):

>   A favicon (favorite icon) is a tiny icon included along with a website, which is displayed in places like the browser's address bar, page tabs and bookmarks menu.
>   It is a usually a high-contrast image. There are free tools to create a favicon.


For a long time, SVG could not be used to create faicon since it was not supported by browsers. However, it is now widely supported by different browsers. You are asked to create a high-contrast favicon.svg file in this part of the assignment using your own drawings or any tool. 


To include the favicon.svg in your website, you need to include the following in the <head></head> of each of your html files:

```<link rel="icon" href="path-to-your-favicon.svg" type="image/svg+xml">```

Don't forget to update the relative path to your favicon.svg in the above code snippet. 

A few helpful resources on favicon: 
-  [SVG, Favicons, and All the Fun Things We Can Do With Them](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/)
-  [Bilding an adaptive favicon](https://web.dev/articles/building/an-adaptive-favicon#:~:text=This%20means%20if%20an%20SVG,light%20and%20dark%20user%20preferences.)
