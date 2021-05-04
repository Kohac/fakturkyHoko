export async function getApiCall(url) { 
    return await fetch(url, {method: 'GET'})
    .then((response) => response.json()); 
}
export async function postApiCall(url, data) {
    return await fetch(url, 
        {method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then((response) => response.json());
}
export async function putApiCall(url, data) {
    return await fetch(url, 
        {method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then((response) => response.json());
}
export async function deleteApiCall(url){
    return await fetch(url,
        {method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
    }}).then((value) => {
        console.log(value.status);
        if (value.status === 204) {
            alert("Položka byla úspěšně odstraněna!")
        }
        else{
            alert("Při odstranění položky se objevila chyba!");
        }
    })
}
