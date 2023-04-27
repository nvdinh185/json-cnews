function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var cId = getParameterByName('cid');

async function getData() {
    const listNewsElement = $("#list-news-by-cat");
    try {
        var catById = await axios.get(`http://localhost:3000/cat/catbyid?id=${cId}`);
        catById = catById.data;

        var catName = catById.name;

        var h1Element = $('<h1></h1>');
        h1Element.text(catName);

        listNewsElement.append(h1Element);

        var listNewsByCat = await axios.get(`http://localhost:3000/news/newsbycat?cid=${cId}`);
        listNewsByCat = listNewsByCat.data;

        listNewsByCat.forEach(function (news) {
            const newsElement = $('<div class="item"></div>');
            newsElement.html(`
                <h2><a href="detail.html?did=${news.id}" title="">${news.description}</a></h2>
                <a href="detail.html?did=${news.id}" title="">
                    <img src="images/${news.image ? news.image : 'no-picture.png'}" alt="${news.image}" width="585" height="157" />
                </a>
                <div class="clr"></div>
                <p>${news.detail}</p>
            `);

            listNewsElement.append(newsElement);

        })
    } catch (err) {
        console.log('Lỗi ' + err);
        listNewsElement.append(`<p style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!<p/>`);
    }
}

getData();