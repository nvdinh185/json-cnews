function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var dId = getParameterByName('did');

async function getData() {

    const detailElement = $("#detail");
    try {
        var newsById = await axios.get(`http://localhost:3000/cnews/${dId}`);

        newsById = newsById.data;

        detailElement.html(`
            <h1>${newsById.description}</h1>
            <div class="item-detail">
                <p>${newsById.detail}</p>
            </div>
        `);
    } catch (err) {
        console.log('Lỗi ' + err);
        detailElement.append(`<p style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!<p/>`);
    }
}

getData();