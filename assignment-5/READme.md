# Assignment 5
Total marks: 60
## Focus 
Using HTML to create a website and deplying it to the internet using [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
### Deliverables
A PDF report submitted to Canvas.
- The PDF file must include **student-name | SFSU-ID | Assignment 5 | your-GitHub-ID** in the header section.
- The body of your PDF report must contain a hyperlink to the GitHub repo.
- The body of your PDF report must contain the URL to your deployed website.
> [!IMPORTANT]
> If your submitted report to Canvas lacks any of the abovementioned detailes, marks will be deducted.
### Your Repo Structure
It is vital for your repo to have the following file structure. Any deviation from this directory tree will result in marks being deducted.
- The repo must include all the files that your website needs.  

```graphql
assignment-5-repo 
  ├─ index.html - # Entry point for your website must be named index.html
  ├─ views/  
  │  ├─ two.html 
  │  └─ three.html
  ├─ README.md - # a markdown file including references to any articles on MDN website or elsewhere that you used in this assignment. 
  └─ resources/ 
     ├─ favicon.svg - # favicon used in your project
     └─ Everything else... - # All your SVG image files that you create will be in in this directory
```
### Instructions
#### index.html
Required features: 
- A custom banner image created by you using basic SVG elements.
    - The banner width must be the full width of the screen.
    - The banner height has no restrictions.
    - The banner image must, at least, include one of each of the following elements:
        - ```<circle>```
        - ```<rect>```
        - ```<polygone>```
        - ```<path>```
  - You have two options to add your SVG drawings to your ```html``` files:
      -  using SVG code directly within ```<body>``` element
      -  using ```<img />``` element to reference a ```SVG``` image file located in the ```resources/``` folder
  -  a ```<nav class="menue"></nav>``` element containing an ```<ul></ul>``` with links to the home page, page two and page three of your website. An example is provided [here](https://developer.mozilla.org/en-US/play).   
  
> [!NOTE]
> You are not asked to use any software to create SVG artwork. However, you are allowed to do so.
> For a list of tools to create SVG art, please click [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Tools_for_SVG)
