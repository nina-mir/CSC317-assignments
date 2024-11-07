# Todos API 

deliverables to Canvas: A PDF file that has a link to a github repo of yours
>your github repo needs to have a file called index.js with all your answers.

### in this assignment, you will be extending the todos API that we worked on Nov.5
### more info about that is available in [this PDF file](https://github.com/nina-mir/CSC317-assignments/blob/d02604a7402289e8055059fe0a93c16a45450b8c/todos-API/guide-NODE-API-todos.pdf)


## Question 1: Add a "Priority" Field to the To-Do API
*Objective*: Extend the to-do API to include a "priority" field in each to-do item.

1- Update the POST endpoint (/todos) to accept a new field called priority in the request body. The priority should be a string with values like "high", "medium", or "low". If the client doesn’t specify a priority, default it to "medium".

2- Update the GET endpoint (/todos) so that each to-do item in the response includes the priority field.

3- Test the new functionality by creating a new to-do item with different priority values (or without any specified priority) and checking that the priority field shows up correctly when you retrieve all to-do items. 

Example Usage
#### Add a new to-do item with "high" priority
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"task": "Complete Express assignment", "priority": "high"}'

#### Retrieve all to-do items
curl http://localhost:3000/todos


## Question 2: Implement a "Complete All" Endpoint
*Objective*: Create a new endpoint that marks all to-do items as completed.

1- Add a PUT endpoint /todos/complete-all that updates all existing to-do items by setting their completed status to true.

2- Test the endpoint by adding some to-do items (with completed: false) and then calling the /todos/complete-all endpoint. Afterward, use the GET /todos endpoint to verify that all items are now marked as completed.

Example Usage 
#### Mark all to-do items as completed
curl -X PUT http://localhost:3000/todos/complete-all

## Question 3: Filter To-Do Items by Completion Status
*Objective*: Add a query parameter to the GET /todos endpoint that allows filtering to-do items based on their completed status.

1- Modify the GET /todos endpoint to accept an optional completed query parameter. If this parameter is provided (as either true or false), filter the returned list to show only items that match the specified completion status.

2- If the completed query parameter is not provided, return the full list of to-do items as usual.

3- Test the new functionality by adding some completed and uncompleted to-do items, then fetching the to-do items with completed=true or completed=false.

Example Usage:

#### Retrieve only completed to-do items
curl http://localhost:3000/todos?completed=true

#### Retrieve only uncompleted to-do items
curl http://localhost:3000/todos?completed=false
