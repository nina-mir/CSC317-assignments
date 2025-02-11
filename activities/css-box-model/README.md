# CSS Box Model & Centering Elements Activity

## 📌 Objective:

In this activity, you will learn about the CSS Box Model, how to modify margins, padding, and borders, and how to center elements using CSS.

## 📌 Instructions:

Apply a Global Reset

Add the following CSS rule to remove default browser styles:
```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```
**What effect does this have on the layout?**

Style the Body Element

Set a background color or image for the entire page.
```
body {
    background-color: #f4f4f4;
    font-family: Arial, sans-serif;
}
```

Try using background-image: ```url('background.webp');``` instead.

**How does background-repeat: no-repeat; affect the background?**

Modify Box Model Properties for .search-container and .movie-container

Add padding inside the divs and adjust the margins to separate them.

```
.search-container, .movie-container {
    background-color: white;
    padding: 20px;
    margin: 30px auto;
    width: 60%;
    border: 2px solid #ccc;
    border-radius: 10px;
}
```

Experiment with different padding and margin values.

**What happens when you remove ```margin: auto;```?**

### Style the Search Bar & Button

Make the search bar visually appealing.

```
.search-bar {
    width: 80%;
    padding: 10px;
    border: 1px solid #888;
    border-radius: 5px;
}
```

Give the search button a cool background color and padding.

```
.search-button {
    background-color: #007BFF;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search-button:hover {
    background-color: #0056b3;
}
```

Center the Movie Poster Image

Add CSS to ensure the movie poster image is centered.

```
.movie-container img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    border-radius: 10px;
}
```

What happens if you remove display: block;?


(Bonus Challenge) Box Shadows & Hover Effects

Add a box-shadow to the .movie-container for a subtle 3D effect.

```
.movie-container {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

Make the movie description text change color when hovered over.

```
.movie-container p:hover {
    color: darkred;
}
```
## 📌 Reflection Questions:

How does box-sizing: border-box; change the way width and height are calculated?
What’s the difference between margin: auto; and text-align: center; when centering elements?