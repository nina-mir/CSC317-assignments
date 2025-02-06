# Four Sorting Algorithms
Our goal is to apply basic HTML5 syntax to create a webpage based on the content in <code> content.txt</code>

## Deliverables
A PDF file submitted to Canvas that includes two working hyperlinks: One for the created repo on GitHub for this assignment + One hyperlink to the deployed webpage

### Phase.1: creating a basic html5 webpage (no CSS needed!)
Using basic HTML tags such as <pre>\<head> \<meta\> \<title\> \<body> \<header> \<div> \<pre> \<code> \<p> \<main> \<footer></pre> 

1. **Create** a html file based on the given content file in this directory and the abovementioned HTML tags. 
> [!WARNING]
> Incorrect use or lack of appropriate HTML5 elements will be penalized.

2.  **Make** a repo on GitHubm upload your HTML file to it, then **deploy** your html file of task.1 above to the internet via GitHub Pages setting in your repo.
3.  **Please, make sure** your deployed link is working! Corrupt links will receive ```null``` marks.
4.  **Submit** to Canvas a PDF file with **2 HYPERLINKs**: one to your repo and one to the deployed webpage 

You will be using id and class attributes in this phase too:

- class: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class
- id: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id

helpful link: https://developer.mozilla.org/en-US/docs/Glossary/Character_reference

Hint.1: the first algoritm markup is provided to help you get started!

```
        <!-- Insertion Sort Section -->
        <div id="insertion-sort" class="algorithm">
            <h2>Insertion Sort</h2>
            <p>
                Insertion sort is a simple sorting algorithm that builds the sorted
                array one item at a time. It is much like sorting playing cards in
                your hands.
            </p>
            <pre><code class="language-javascript">// Insertion Sort Implementation
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}
  
```
Hint.2: the above code block needs to be within the \<main> element of the html page.

Bonus activity one: [CSS related] 
- Change the font-family of your entire document to inter on [Google Fonts](https://fonts.google.com/specimen/Inter)
- Change the font-family of code content in your html file to [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro) 

Bonus activity two: [CSS related]
- change the background of the footer element to SFSU purple color
- change the font color of the footer element to SFSU gold color
- change the font-style of footer content to bold styling using CSS
  
[info about SFSU color codes can be found here](https://www.brandcolorcode.com/san-francisco-state-university-sfsu)

  

 


### Phase.2: adding basic CSS styling to our webpage
Adding styling to create a modern-looking UI using modern CSS properties to style the text/font/spacing etc. -  
