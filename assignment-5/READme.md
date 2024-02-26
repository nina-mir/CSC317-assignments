# Assignment 5
Total marks: 60
Focus: Using HTML to create a website and deplying it to the internet using [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
## Deliverables
A PDF report submitted to Canvas.
- The PDF file must include **student-name | SFSU-ID | Assignment 5 | your-GitHub-ID** in the header section.
- The body of your PDF report must contain a hyperlink to the GitHub repo.
- The body of your PDF report must contain the URL to your deployed website.
## Your Repo Structure
It is vital for your repo to have the following file structure. 
- The repo must include all the files that your website needs.  

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
Required features: 
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
      -  using ```<img />``` element to reference a ```SVG``` image file located in the ```resources/``` folder
-  ```<nav class="menue"></nav>``` element following the banner image.
    -  This element contains an ```<ul></ul>``` element that contains list items that are each a hyperlink to the home page(```./index.html```), page two(```/views/two.html```) and page three(```views/three.html```) of your website. More info and examples can be found [here](https://developer.mozilla.org/en-US/play).
-  ```<h1></h1>``` element containing the following text: `Assignment 5`. This element is right after the ```nav``` element.
-  ```<h2></h2>``` element containing the following text: `How to Apply CSS to HTML`. This element is placed right after the ```h1``` element. 
-  ```<p id="CSS"></p>``` element containing information on how to include an **external** CSS file in an ```html``` file with **an example**. This element follows the ```h2``` element above.
    -  Any _code_ used in your answer **must be** within a [```<code></code>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) or [```<pre></pre>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre) elements. [This](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured) MDN article explains how to apply external CSS to ```html```.
- ```<h2></h2>``` element containing the following text: `How to Use Javascript in a Webpage`. This element is placed right after the above ```<p></p>``` element.
- ```<p></p>``` that follows the above ```h2``` element. This paragraph element contains the following information:
    - How to link to an **external** Javascript file with an example.
    - How to write Javascript code within an ```html``` file with an example.
    - As mentioned earlier, any _code_ used in your answers **must be** within a [```<code></code>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) or [```<pre></pre>```](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre) elements. [This](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage) MDN article explains how to import JS code into a webpage. 
> [!NOTE]
> You are not asked to use any software to create SVG artwork. However, you are allowed to do so.
> For a list of tools to create SVG art, please click [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Tools_for_SVG)
#### index.html

