document.addEventListener("DOMContentLoaded", function() {

    const ul = document.getElementById("list")
    const showPanel = document.getElementById("show-panel")

    function fetchBooks() {
        fetch("http://localhost:3000/books")
        .then((resp) => resp.json())
        .then((jsonBooks) => {
          jsonBooks.forEach(book => {
              bookList(book)
            })
        })
      }
    fetchBooks();

    function bookList(book) {
        const list = document.createElement("li")
        list.innerText = book.title
        ul.append(list)

        list.addEventListener("click", function (e){
            e.preventDefault();
            showPanel.innerHTML = ""
            const img = document.createElement("img");
            img.src = book.img_url
            const p = document.createElement("p")
            p.innerText = book.description
            const userUl = document.createElement("ul")
            book.users.forEach(user => {
                const userLi = document.createElement("li")
            userLi.innerText = user.username
            userUl.append(userLi)
            })
            const button = document.createElement("button")
            const currentUserLiked = book.users.some(user => user.id === 11);
            button.innerText ="like"
            showPanel.append(img, p, userUl, button)

            button.addEventListener("click", patchUsers)
            function patchUsers(e) {
                e.preventDefault()
                if (currentUserLiked) {

                    fetch(`http://localhost:3000/books/${book.id}`, {
                    method: "PATCH",
                    headers:
                    {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        users: book.users.filter(user => user.id !== 11)
                    })
    
                    })
                    .then((response) => response.json())
                    .then((jsonUpdate) => {
                        userUl.innerHTML = ""
                        jsonUpdate.users.forEach(user => {
                            const userLi = document.createElement("li")
                        userLi.innerText = user.username
                        userUl.append(userLi)
                        })
                    }) 

                }else{

                fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers:
                {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    users: [...book.users, {id: 11, username: "matt"}]
                })

                })
                .then((response) => response.json())
                .then((jsonUpdate) => {
                    userUl.innerHTML = ""
                    jsonUpdate.users.forEach(user => {
                        const userLi = document.createElement("li")
                    userLi.innerText = user.username
                    userUl.append(userLi)
                    })
                }) 

                }
            }
        })
    }


});
