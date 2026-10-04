let blogs =
    JSON.parse(localStorage.getItem("travelBlogs")) || [

    {
        title: "A Weekend in Rajasthan",
        author: "Aarav",
        category: "India",
        content:
        "Rajasthan is full of colourful cities, historic forts and beautiful desert landscapes. It is a wonderful destination for anyone interested in culture and history.",
        icon: "🏰"
    },

    {
        title: "Walking Through Paris",
        author: "Maya",
        category: "Europe",
        content:
        "Paris offers beautiful streets, museums, cafés and famous landmarks. Walking around the city is one of the best ways to experience its atmosphere.",
        icon: "🗼"
    },

    {
        title: "Exploring Japan",
        author: "Rohan",
        category: "Asia",
        content:
        "Japan combines traditional culture with modern cities. From peaceful temples to busy streets, every place offers something different.",
        icon: "⛩️"
    },

    {
        title: "Into the Mountains",
        author: "Sara",
        category: "Nature",
        content:
        "Mountain trips offer fresh air, beautiful scenery and an opportunity to disconnect from everyday life and enjoy nature.",
        icon: "🏔️"
    }

];


const blogList =
    document.getElementById("blogList");


/* DISPLAY BLOGS */

function displayBlogs(data) {

    blogList.innerHTML = "";

    if (data.length === 0) {

        blogList.innerHTML =
            "<p>No travel stories found.</p>";

        return;
    }


    data.forEach(blog => {

        blogList.innerHTML += `

            <article class="blog">

                <div class="blog-image">
                    ${blog.icon || "🌍"}
                </div>

                <div class="blog-content">

                    <span class="blog-category">
                        ${blog.category}
                    </span>

                    <h2>
                        ${blog.title}
                    </h2>

                    <p>
                        ${blog.content}
                    </p>

                    <p class="author">
                        Written by ${blog.author}
                    </p>

                </div>

            </article>

        `;

    });
}


displayBlogs(blogs);


/* SEARCH + CATEGORY FILTER */

function filterBlogs() {

    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase();

    const category =
        document
        .getElementById("category")
        .value;


    const result = blogs.filter(blog => {

        const matchesSearch =
            blog.title
            .toLowerCase()
            .includes(search);

        const matchesCategory =
            category === "all" ||
            blog.category === category;

        return matchesSearch && matchesCategory;

    });


    displayBlogs(result);
}


document
    .getElementById("search")
    .addEventListener(
        "input",
        filterBlogs
    );


document
    .getElementById("category")
    .addEventListener(
        "change",
        filterBlogs
    );


/* CREATE BLOG */

document
    .getElementById("blogForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const title =
                document
                .getElementById("title")
                .value
                .trim();


            const author =
                document
                .getElementById("author")
                .value
                .trim();


            const category =
                document
                .getElementById("blogCategory")
                .value;


            const content =
                document
                .getElementById("content")
                .value
                .trim();


            /* VALIDATION */

            if (
                !title ||
                !author ||
                !category ||
                !content
            ) {

                alert(
                    "Please complete all fields."
                );

                return;
            }


            /* NEW BLOG */

            const newBlog = {

                title: title,

                author: author,

                category: category,

                content: content,

                icon: "✈️"

            };


            blogs.push(newBlog);


            /* SAVE */

            localStorage.setItem(
                "travelBlogs",
                JSON.stringify(blogs)
            );


            /* UPDATE PAGE */

            displayBlogs(blogs);


            /* CLEAR FORM */

            this.reset();


            alert(
                "Your travel story has been published!"
            );

        }
    );
