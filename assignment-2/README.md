# Assignment 2
Assuming you got access to a Linux Ubuntu OS machine that you were supposed to make in the Assignment-1, this assignment asks you to download a few files from this directory onto your Ubuntu machine. Then, you are asked to create a node server and modify the included HTML files by way of answering some questions about Node.js and Express web framework. As always, come to our discord channel to exhcnage ideas and troubleshoot. 

> [!NOTE]
>  Steps 12 and 13 are optional.


## Instructions
1. Download the files in this diretory to your machine
2. Create a directory on your home directory called _CSC-317_ using the appropriate Linux command (Hint: _mkdir directory-name_)
3. Change your working directory to the newly created directory in the previous step and make a directory called _assignment-2_  (What is change diectory command in Linux?)
4. Move or copy the downloaded files in step.1 to asignment-2 directory using appropriate Linux command (Hint: _cp source target_)

### For reference
Your _assignment-2_ directory should include the four files in the following tree structure:

<img src="https://github.com/nina-mir/CSC317-assignments/blob/3531c552f276d66aa88291ac2bf03fb4f125d548/assignment-2/images/assignment-2-tree.png" width="500px">


5. Change your working directory to assignment-2 directory
6. If you have VS Code, run:
     ```
       $ code .
     ````
     to open the content of CSC-317 inside VS Code
   
   **note:** if you prefer other editors, feel free to use whatever you like. But, this write-up as in the rest of this course assumes you are using VS Code.
7. Make sure you have node.js installed by running the following on your terminal commandline
   ```
   $ node -v
   ```
   A version of 18 or higher is recommended for your nodde.js. If nothing shows up, you need to install node.
   A Node installation guide is provided [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04).
   
9. Run node to serve the HTML files:
   ```
   $ node server_node_only.js
   ```
     You should see the following on your terminal: 

<img src="https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-2/images/node-run.png" width="500px">

9. Open your browser and navigate to ``` http://localhost:3000/ ```.
In this step, you will be answering the question on this page by modifying the index.html file that is already accessible on your VS Code.
Navigate to VS Code and remove the ___ placeholder character and type in your answers.

     At any time during this prcess, you can go to your browser tab and refresh the page to see you answers reflected on the browser.
Note: It's recommended to install Google Chrome on your Ubuntu OS. Check this [resource](https://itsfoss.com/install-chrome-ubuntu/)

10. Follow the instrcution on index.html and take a screen shot of your answer. The screen shot needs to be included on a single page in a PDF report for ths assignment to Canvas along with **your name/SFSU ID** on the header section of each page of your report, please! Make sure your screenshot is clear and easily readable. You may need to take 2 screenshots for a better visibility. Keep in mind, if I can not read your screenshot easily, you will lose marks. **Make sure it looks nice and clear.**
11. After finishing steps.1-10, navigate to ``` http://localhost:3000/about```
12. **[Optional]** You are invited to offer reflections that you may have so far. Anything is cool! You can even write about a project idea that keeps you excited!
13. **[Optional]** You can offer reflections by modifying the about.html file the same way you modified index.html in the earlier steps.
     if you decide to do step.12, take a screenshot of your write-up and include it in the PDF report right after the screenshot of step.9, on a seperate page, please. 
15. Go to your editor and open server_node_only.js file and inspect the code. It is in Javascript. 
16. Go to your terminal CL where node engine is running. exit node by pressing ```ctrl + c```
17. Now, run: ``` node  server_node_express.js ```
18. It is quite possible that you may get an error message. There is a good chace the error message you are getting is because express.js is not yet installed in your active directory!
19. To install express, you can refer to this page on express docs: https://expressjs.com/en/starter/installing.html
20. In short, you should either use ``` $ npm install express
``` or ``` $ npm install express --no-save ```
You can decide which one you prefer after doing an online search 😉.
21. After successfully installing express, run the command in **step.16** again. If it is successful, move on to **Step.22** below.
22. Navigate to your localhost adress in your browser
23. You should see your answers from earlier on the browser.
24. Go to VS Code and compare the two JS files with each other. They both do the same job. Now, answer this following question:

    Which one would you prefer as a web developer and why? 

    Your answer must be on a seperate page in your PDF report. It can be a short paragraph of 2-3 sentences or more! It needs to be after the screenshot of step.10 and/or the optional step.13.


> [!IMPORTANT]
> **Your PDF report will be either two pages or three pages. Try using Google Docs to easily paste your screenshots and type in your paragraph. You can then easily download the Google docx file as a PDF file to your computer and submit that PDF file to Canvas.**

_Again, steps.12 and 13 are optional!_
