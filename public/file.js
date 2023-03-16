function onSubmitHandler(e, {boardId, listId, cardId}) {
        e.preventDefault();

        const file = document.getElementById('file');
        console.log(file.files[0]);

        const data = new FormData();
        console.log(data);
        data.append("image", file.files[0]);
        data.append("boardId", boardId);
        data.append("listId", listId);
        data.append("cardId", cardId);
        console.log(data);
        const server = "http://localhost:3000";

        fetch(`/upload/single`, {
            method: "POST",
            body: data,
        })
            .then((result) => {
                console.log("File sent successfully", result);
            })
            .catch((err) => {
                console.log("Something Went Wrong", err);
            });
    };
