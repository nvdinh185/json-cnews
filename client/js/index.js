async function getData() {
    const listNewsElement = $("#list-news");

    try {
        var listNews = await axios.get('http://localhost:3000/news');
        listNews = listNews.data;

        listNews.forEach(function (news) {
            const newsElement = $('<div class="item"></div>');
            newsElement.html(`
                <h2><a href="detail.html?did=${news.id}" title="">${news.description}</a></h2>
                <a href="detail.html?did=${news.id}" title="">
                    <img src=images/${news.image ? news.image : 'no-picture.png'} alt="" width="585" height="156" />
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