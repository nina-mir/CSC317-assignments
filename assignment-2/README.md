Assuming you got access to a Linux Ubuntu OS machine that you were supposed to make in the previous assignment, this assignment will ask you to download a few files from this same repository onto your Ubuntu machine. Then, you are asked to create a node server and modify the included HTML files by way of answering some questions about Node.js and Express web framework. As always, come to our dicord channel to exhcnage ideas and troubleshoot. 

### Instructions
1. download the files in this diretory to your machine
2. create a directory on your home directory called _CSC-317_ using the terminal CLI
3. move or copy the downloaded files in step.1 to directory _CSC-17_ 
4. change your working directory to directory _CSC-317_ that you made in step.2
5. if you have VScode, run (that period symbol is important!)
     ```
       $ code .
     ````
     to open the content of CSC-317 inside VScode
   note: if you prefer other editors, feel free to use whatever you like. But, this write-up assumes you are using VScode.
6. make sure you have node.js installed by running on your terminal commandline
   ```
   $ node -v
   ```
   if nothing shows up, you need to install node. source: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
7. run node:
   ```
   $ node server_node_only.js
   ```
8. open your browser and navigate to ``` http://localhost:3000/ ```
in this step, you will be answering the question on this page by modifying the index.html file that is already accessible on your VScode.
Navigate to VScode and remove the ___ placeholder character and write your own answers.

     At any time during this prcess, you can go to your browser tab and refresh the page to see you answers reflected on the browser.
Note: Install Google Chrome on your Ubuntu OS. Check this resource: https://www.cyberciti.biz/faq/how-to-install-google-chrome-in-ubuntu-linux-12-xx-13-xx/

9. Follow the instrcution on index.html and take a screen shot of your answer. The screen shot needs to be included in a PDF report for ths assignment to Canvas along with your name/SFSU ID, please!
10. After finishing steps.1-10, navigate to ``` http://localhost:3000/about```
11. [Optional] you are invited to offer reflections that you may have so far. Anything is cool! You can even write about a project idea that keeps you excited!
12. [Optional] you can offer reflections by modifying the about.html file the same way you modified index.html in the earlier steps.
     if you decide to do step.12, take a screenshot of your write-up and include it in the PDF report right after the screenshot of step.9, please. 
13. go to your editor and open server_node_only.js file and inspect the code.
14. go to your terminal CL where node engine is running. exit node by pressing ```ctrl + c```
15. now, run: ``` node  server_node_express.js ```
16. It is quite possible that you may get an error message. There is a good chace the error message you are getting is because express.js is not yet installed in your active directory!
17. to install express, you can refer to this page on express docs: https://expressjs.com/en/starter/installing.html
18. in short, you should either use ``` $ npm install express
``` or ``` $ npm install express --no-save ```
you can decide which one you prefer.
20. after installing express, run the command in step.15 above again
21. repeat step.8 above
22. you should see your answers from step.9.
23. go to VScode and compare the two JS files with each other. They both do the same job. Now, answer this following question:

    Which one would you prefer as a web developer and why? 

    Type your answer in a sperate aragraph after the screenshot of step.9 and/or the optional step.12.

    Again, steps.11 and 12 are optional!

    



   
   
