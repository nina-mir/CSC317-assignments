# Relational Databases & Hands-on SQLite Fun

## Part 1: Introduction to Relational Databases

Relational databases store data in **tables**, which look a bit like spreadsheets. Each table contains **rows** (individual records) and **columns** (fields or attributes of the data). The power of a relational database lies in how tables can be linked to each other through **relationships**.

### Key Concepts

1. **Table**: A structured arrangement of rows (records) and columns (fields).
2. **Row (Record)**: One set of data in a table. For example, one row could contain the information about a single “Animal.”
3. **Column (Field)**: A single attribute of data stored in every row (e.g., “habitat” or “lifeExpectancy”).
4. **Primary Key**: A unique identifier for each row in a table. Often an auto-incremented number (ID).
5. **Foreign Key**: A column in one table that references a primary key in another table, linking the two tables together.
6. **Query**: A command used to interact with the database, commonly written in SQL (Structured Query Language).
7. **Relationship**: The logical link between two tables (e.g., one-to-one, one-to-many, many-to-many).

### A Brief History of SQL (Structured Query Language)

- **Origins**: SQL was developed in the 1970s by IBM. Its creation was influenced by E.F. Codd’s research on the relational model.
- **Popularity**: SQL is arguably the most widely used language for interacting with relational databases:
  - It’s **easy** to read and learn (comparatively!).
  - It’s **standardized**, although different database systems (MySQL, PostgreSQL, SQLite, etc.) can have small variations.
  - It allows both simple and very **powerful** data manipulations.

### Why SQL is Still So Popular

1. **Mature and Well-Supported**: Over 40 years of development, strong community support, and well-tested libraries.
2. **Widespread**: Many different database systems use SQL, so learning it can be transferred across projects.
3. **Declarative**: You specify *what* you want from the data, not *how* to get it.
4. **Scalable**: Can handle small prototypes or massive enterprise applications with equal efficiency.

### Making a Table: A Real-World Use Case Example

Let’s imagine you run a small store and want to track customer orders. You might create a table called `orders`:

```sql
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    item TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    order_date TEXT
);
```

- Here, `order_id` is your **Primary Key**.
- `customer_name`, `item`, `quantity`, and `order_date` are columns with respective data types.
- `TEXT`, `INTEGER`, and other data types vary by the database system, but typically follow a similar naming scheme in SQL.

---

## Part 2: Installing and Using SQLite

SQLite is a lightweight, file-based database engine. It’s perfect for small projects or learning the basics of SQL.

### Installation Steps

#### Windows

1. Go to the official SQLite website (or use a package manager like [Chocolatey](https://chocolatey.org/) if you have it).
2. Download the **SQLite Tools for Windows** (a zip file).
3. Unzip the folder and move the `sqlite3.exe` file into a convenient location (e.g., `C:\sqlite`).
4. (Optional) Add `C:\sqlite` to your system `PATH` so you can call `sqlite3` from any folder in the Command Prompt.

#### macOS

1. Open the Terminal.
2. Type `brew install sqlite` if you have [Homebrew](https://brew.sh/). Otherwise, you can download the precompiled binaries from the SQLite website.
3. Verify installation by typing `sqlite3 --version`.

#### Linux (Ubuntu/Debian example)

1. Open a terminal.
2. Run `sudo apt-get update`.
3. Then run `sudo apt-get install sqlite3`.
4. Verify by typing `sqlite3 --version`.

---

## Create a New Database Called “animals”

We’ll do this using the SQLite shell (often just called `sqlite3`).

1. **Open** your terminal or command prompt.
2. **Navigate** to the folder where you want to store your database file.
3. Type:

   ```bash
   sqlite3 animals.db
   ```

   This creates a new file named `animals.db` (or opens it if it already exists) and starts the SQLite shell.

### Make a Table Named “animals”

Inside the SQLite shell, create the table like so:

```sql
CREATE TABLE animals (
    name TEXT NOT NULL,
    habitat TEXT NOT NULL,
    mammal BOOLEAN NOT NULL,
    food TEXT NOT NULL,
    lifeExpectancy INTEGER NOT NULL
);
```

### Insert Some Rows

Next, we’ll add rows for six animals: pandas, snow leopards, marmots, kangaroos, koalas, and the bald eagle.

```sql
INSERT INTO animals (name, habitat, mammal, food, lifeExpectancy)
VALUES
    ("Panda", "Forest", 1, "Bamboo", 20),
    ("Snow Leopard", "Mountains", 1, "Meat", 15),
    ("Marmot", "Mountains", 1, "Plants", 15),
    ("Kangaroo", "Grassland", 1, "Plants", 23),
    ("Koala", "Forest", 1, "Eucalyptus Leaves", 15),
    ("Bald Eagle", "Near Water", 0, "Fish/Small Mammals", 20);
```

Note that in SQLite:

- `1` is treated as `true` (for `mammal`).
- `0` is treated as `false`.

### Modifying Data (UPDATE, ALTER, etc.)

#### Update a Row

Let’s say we got the life expectancy of Koalas wrong—turns out they can live up to 18 years. We can update that row:

```sql
UPDATE animals
SET lifeExpectancy = 18
WHERE name = "Koala";
```

#### Add Another Column (Altering the Table)

Need to store an `endangeredLevel`? No problem:

```sql
ALTER TABLE animals
ADD COLUMN endangeredLevel TEXT;
```

Then, we can update the data:

```sql
UPDATE animals
SET endangeredLevel = "Vulnerable"
WHERE name IN ("Panda", "Snow Leopard", "Bald Eagle");
```

Feel free to tweak the data as you see fit!

### Making Queries

The real magic is in how to retrieve data.

**Example 1**: Get all animals living over 20 years:

```sql
SELECT name, lifeExpectancy
FROM animals
WHERE lifeExpectancy > 20;
```

**Example 2**: Get all non-mammals:

```sql
SELECT *
FROM animals
WHERE mammal = 0;
```

**Example 3**: Sort animals by their life expectancy descending:

```sql
SELECT *
FROM animals
ORDER BY lifeExpectancy DESC;
```

Use your imagination! Experimenting with various queries is a fantastic way to learn.

---

## Keep It Fun & Inclusive

- Don’t be afraid to rename animals in German just for fun, e.g., “Koala” as “Koala (Der Flauschige!)” in your table.
- Feel free to add columns like `favoriteToy`, `populationEstimate`, or anything that reflects your curiosity or cause you want to highlight.

The **key** is to experiment, break things, fix them, and explore. That’s how we truly learn!

---

### Any Questions?

- Which animal do you want to add next?
- Do you have any interesting facts about an animal that you’d like to store in this database?
- Anything you’d like to do differently? Let me know — I’m all ears!

Viel Spaß (Have fun) and happy coding!
