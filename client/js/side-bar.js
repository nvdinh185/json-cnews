async function getData() {
    var listCatElement = $("#list-cat");
    try {

        var listCat = await axios.get('http://localhost:3000/cat');

        listCat = listCat.data;

        listCat.forEach(function (news) {
            const liElement = $('<li></li>');
            liElement.html(`
                <a href="cat.html?cid=${news.id}">${news.name}</a>
            `);

            listCatElement.append(liElement);

        })
    } catch (error) {
        console.log('Lỗi ' + error);
        listCatElement.append(`<li style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!</li>`);
    }
}

getData();