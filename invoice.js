window.onload = function load() {
    // invoice-header
    document.getElementById("invoice-id").innerHTML = 'invoice-id';
    document.getElementById("contractor-name").innerHTML = 'contractor-name'
    document.getElementById("contractor-street").innerHTML = 'contractor-street';
    document.getElementById("contractor-psc-city").innerHTML = 'contractor-psc-city';
    document.getElementById("contractor-country").innerHTML = 'contractor-country';
    document.getElementById("contractor-ico").innerHTML += 'contractor-ico';
    document.getElementById("contractor-dic").innerHTML += 'contractor-dic';
    //Invoice subsriber
    document.getElementById("subscriber-name").innerHTML = 'subscriber-name';
    document.getElementById("subscriber-street").innerHTML = 'subscriber-street';
    document.getElementById("subscriber-psc-city").innerHTML = 'subscriber-psc-city';
    document.getElementById("subscriber-country").innerHTML = 'subscriber-country';
    document.getElementById("subscriber-ico").innerHTML += 'subscriber-ico';
    document.getElementById("subscriber-dic").innerHTML += 'subscriber-dic';
    //bankovn9 spojen9
    document.getElementById("bank-number").innerHTML += 'bank-number'
    document.getElementById("qr-code").innerHTML += ':   qr-code'
    //platebni udaje
    document.getElementById("variable-symbol").innerHTML = 'variable-symbol';
    document.getElementById("constant-symbol").innerHTML = 'constant-symbol';
    document.getElementById("specific-symbol").innerHTML = 'specific-symbol';
    document.getElementById("order-id").innerHTML = 'order-id';
    //platebni udaje splatnosti
    document.getElementById("due-date-of-document").innerHTML = 'due-date-of-document';
    document.getElementById("payment-type").innerHTML = 'payment-type';
    document.getElementById("date-of-document").innerHTML = 'date-of-document';
    document.getElementById("due-date-of-real-taxable-supply").innerHTML = 'due-date-of-real-taxable-supply';
    //adresa dodani
    document.getElementById("delivery-company").innerHTML = 'delivery-company';
    document.getElementById("delivery-deputy").innerHTML = 'delivery-deputy';
    document.getElementById("delivery-psc-city").innerHTML = 'delivery-psc-city';
    document.getElementById("delivery-street").innerHTML = 'delivery-street';
    document.getElementById("delivery-country").innerHTML = 'delivery-country';
}