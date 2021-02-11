document.addEventListener("DOMContentLoaded", function (event) {
    const section = document.querySelector('.section');
    const btns = section.querySelectorAll('.btn')

    if(localStorage.getItem('btns')) {
        let data = JSON.parse(localStorage.getItem('btns'));
        data.forEach(item => {
            document.getElementById(item.id).classList.add('btn_cart');
            document.getElementById(item.id).innerHTML = '<img src="./assets/img/ok.svg" alt="ok"></img> В корзине';
        })
    }

    btns.forEach(item => {
        item.addEventListener('click', (e) => {
            if(e.target.classList.contains('btn_cart')) {
                return;
            };
            e.target.innerHTML = '<div class="loader"></div>'
            setTimeout(() => {
                fetch('https://jsonplaceholder.typicode.com/posts/1').
                then(result => result.json()).
                then(data => {
                    if (data) {
                        e.target.classList.add('btn_cart')
                        e.target.innerHTML = '<img src="./assets/img/ok.svg" alt="ok"></img> В корзине';
                        setDataToLocalStorage();
                    }
                })
            }, 1000)
        });
    });

    const setDataToLocalStorage = () => {
        let data = [];
        btns.forEach(item => {
            if(item.classList.contains('btn_cart')) {
                data.push({'id': item.id, 'inCart': true})
            }
        })
        localStorage.setItem('btns', JSON.stringify(data));
    }
});
