if (axios && moment) {
    console.log("Jes");
}

const container = document.querySelector('.container');
const url = '/api/v1';
//need to call after fetch data
// container.innerHTML = 'Jerry Christmas';

//postForm in axios is available
async function fetchData() {
    try {
        container.innerHTML = "";
        const res = await axios.get(`${url}/photos`).then(res => res.data)
            .then(res => {
                let imageArray = Array.from(res.images)

                imageArray.map((ele) => {
                    container.innerHTML += `<div class="image_block" id="${ele._id}">
                        <img src="${ele.image}"
                            alt="" srcset="">
                        <div class="credits">
                            
                                Published By: <span id="publishedBy">${ele.publishedBy}</span>
                                <br>
                                Published At: <span id="publishedAt">${moment(ele.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                <br>
                                Description: <span id="description">${ele.description}</span>
                                
                            <div class="">
                            <button type="button" class="download_btn" data-downloadLink="${ele.image}">DOWNLOAD</button>
                            </div>
                            </div>
                            </div>`
                });
                return imageArray;
            }).then(res => {
                const downloadBtns = document.querySelectorAll('.download_btn');
                console.log(downloadBtns);

                downloadBtns.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        const downloadLink = e.target.dataset.downloadlink;
                        const newWindow = window.open(`${url}/downloads?downloadLink=${downloadLink}`);

                        newWindow.setTimeout(() => {
                            newWindow.close()
                        }, 7000);
                    })
                })
            });
    } catch (e) {
        console.log("ERRR, ERROR", e);
    }
};

fetchData();
