const dataContainer = document.querySelector('#data-wrapper');

const url = 'http://localhost:5555/api/pipelines'

const loadData = () => {
    fetch(url, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) =>{
        response.json().then((data) => {
            const dataItem = (data.error) ? data.error : data.data.pipelines
            

            console.log(typeof dataItem)
            dataItem.forEach(item => {
                console.log(item)
                Object.entries(item).forEach(([key, value]) => {
                    const dataParagraph = document.createElement("p");
                    dataParagraph.textContent = key + " :: " + value;
                    dataContainer.appendChild(dataParagraph);

                });

            });
            
        })
    })
}

loadData();
    