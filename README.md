# Ubuntu-setup-virtualbox
### A guide to install Ubuntu OS in VirtualBox
*The information in this guide is based on the work/materials by Robert Bierman and Andrew Scott of SF State CS Dept re: CSC 317 course. (Additional information is included from other online sources.)*

This guid has two different sections: Intel CPU architecture and MacBook M1/M2/M3. Refer to the section that matched your computer's CPU architecture, please. 

### Intel 64bit 
**Step. 1** download and install VirtualBox version VirtualBox 6.1.20 (released April 20 2021) + Package Extension file from the followin link. Refer to the image below from the same link for more info.
Link: https://www.virtualbox.org/wiki/Download_Old_Builds_6_1
<img src="images-setup/virtualbox-6.1.2.png" width="400">

First, install VirtualBox on your machine. Then, click on its icon. You should see the following image. 
<img src="images-setup/vbox-welcome.png" width="400">

Click on **Tools**. Then, click on File>Preferneces>Extensions. Now, click on the plus button to add the Extension Package file that you downloaded earlier. Press OK and exit. 

**Step.2**
In this step, we will install Ubuntu 22.04 LTS	Jammy Jellyfish using the VirtualBox. First, you need to downloand an OVA file containing an image of Ubuntu OS that has VSCode and Node.js already installed on it from this link: https://sfsu.app.box.com/v/csc317webdevova 

Note: It is a large file of 6.9 GB. It will take minutes to hours depending on your internet connection to download. 

After the OVA file is downloaded. Go the main menu of Virtualbox. Now, press on **Import** button on the right side as seen below.
<img src="images-setup/Import-virtual-box.png" width="400">
Now, press on the folder button as seen below and select the OVA file on your hard drive. Then, press **Next**.
<img src="images-setup/Screenshot from 2024-01-31 13-01-52.png" width="400">




