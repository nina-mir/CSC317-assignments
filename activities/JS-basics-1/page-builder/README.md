# HTML Page Builder activity -- DOM manipulation

> [!NOTE]
> DO NOT look at the page-builder-SOLUTIONS.js file until after you do each task on your own!

## 🎯 To practice basic JS concepts such as loops, function, conditional statement and DOM manipulation

## task.1

create the following HTML markup using the info of the first element of the given ```data``` array, then append the parent ```<div>``` to the ```<main>``` HTML element on ```index.html```. 


```html
<div>
  <h2>Homenaje a la Neurocirugía by Marta Colvin Andrade</h2>
  <p>
    Although Colvin is predominantly known for abstract themes that allude to
    pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is
    one of her most recognizable public art pieces.
  </p>
  <img
    src="https://i.imgur.com/Mx7dA2Y.jpg"
    referrerpolicy="no-referrer"
    width="120"
    alt="A bronze statue of two crossed hands delicately holding a human brain in their fingertips."
  />
  <hr />
</div>
```

## task.2 

Loop throught all the elements of the given data array and do task.1 for each.

- make sure the last div child has no trailing ```<hr>```


## task.3 

create a  ```addDivElement(idx)``` function to move all the DOM manipulation operation to that function. The function has one input argument of index referring to the element index in the data array.

## task.4 

- add a ```display: flex``` to the ```main``` element. 

- make sure the ```<h1>``` element takes up a whole row




