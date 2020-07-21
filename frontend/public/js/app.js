const dataContainer = document.querySelector('#data-container');
const wrapper = document.querySelector('#wrapper')

console.log("loading client side")

wrapper.addEventListener('click', (e) => {
    e.preventDefault()
    

    const url = 'http://localhost:5555/pipelines'

    fetch(url).then((response) =>{

        response.json().then((data) => {
            if(data.error){
                dataContainer.textContent = data.error;
            }else{
                dataContainer.textContent = JSON.stringify(data)
            }
        })
    })
})