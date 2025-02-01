document.addEventListener('DOMContentLoaded', function () {
    // Retrieve data from localStorage
    const invoiceNumber = localStorage.getItem('invoiceNumber');
    const invoiceDate = localStorage.getItem('invoiceDate');
    const paymentConditions = localStorage.getItem('paymentConditions');
    const latestPaymentDate = localStorage.getItem('latestPaymentDate');
    const invoicedAmount = localStorage.getItem('invoicedAmount');
    const clientName = localStorage.getItem('clientName');
    const clientAddress = localStorage.getItem('clientAddress');
    const clientState = localStorage.getItem('clientState');
    const yourReference = localStorage.getItem('yourReference');
    const ourReference = localStorage.getItem('ourReference');
    const workTitle = localStorage.getItem('workTitle'); 
    const lineItems = JSON.parse(localStorage.getItem('lineItems'));

    // Format dates
    const formattedInvoiceDate = formatDate(invoiceDate);
    const formattedLatestPaymentDate = formatDate(latestPaymentDate);

    // Format amounts with commas
    const formattedInvoicedAmount = formatNumberWithCommas(invoicedAmount);

    // Populate invoice details
    const invoiceNumberElement = document.querySelector('.invoiceNumber');
    if (invoiceNumberElement) {
        invoiceNumberElement.textContent = invoiceNumber;
    } else {
        console.error('Element with class "invoiceNumber" not found');
    }

    const invoiceDateElement = document.querySelector('.invoiceDate');
    if (invoiceDateElement) {
        invoiceDateElement.textContent = formattedInvoiceDate;
    } else {
        console.error('Element with class "InvoiceDate" not found');
    }

    const paymentConditionsElement = document.querySelector('.paymentConditions');
    if (paymentConditionsElement) {
        paymentConditionsElement.textContent = `${paymentConditions} days` ;
    } else {
        console.error('Element with class "paymentConditions" not found');
    }

    const latestPaymentDateElement = document.querySelector('.latestPaymentDate');
    if (latestPaymentDateElement) {
        latestPaymentDateElement.textContent = formattedLatestPaymentDate;
    } else {
        console.error('Element with class "lastPaymentDate" not found');
    }

    const invoicedAmountElement = document.querySelector('.invoicedAmount');
    if (invoicedAmountElement) {
        invoicedAmountElement.textContent = `${formattedInvoicedAmount} DKK`;
    } else {
        console.error('Element with class "invoicedAmount" not found');
    }

    const clientNameElement = document.querySelector('.clientName');
    if (clientNameElement) {
        clientNameElement.textContent = clientName;
    } else {
        console.error('Element with class "clientName" not found');
    }

    const clientAddressElement = document.querySelector('.clientAddress');
    if (clientAddressElement) {
        clientAddressElement.textContent = clientAddress;
    } else {
        console.error('Element with class "clientAddress" not found');
    }

    const clientStateElement = document.querySelector('.clientState');
    if (clientStateElement) {
        clientStateElement.textContent = clientState;
    } else {
        console.error('Element with class "clientState" not found');
    }

    const yourReferenceElement = document.querySelector('.yourReference');
    if (yourReferenceElement) {
        yourReferenceElement.textContent = yourReference;
    } else {
        console.error('Element with class "Your reference" not found');
    }

    const ourReferenceElement = document.querySelector('.ourReference');
    if (ourReferenceElement) {
        ourReferenceElement.textContent = ourReference;
    } else {
        console.error('Element with class "Our reference" not found');
    }

    const workTitleElement = document.querySelector('#workTitle');
    if (workTitleElement) {
        workTitleElement.textContent = workTitle;
    } else {
        console.error('Element with class "workTitle" not found');
    }

    // Populate line items
    const lineItemsTable = document.getElementById('lineItemsTable');
    let totalAmount = 0;

    lineItems.forEach(item => {
        const row = document.createElement('tr');
        const description = item.description.toLowerCase();

        const isNegative = description.includes('cost') || description.includes('debit') || description.includes('expenditure');
        const total = isNegative ? -Math.abs(item.total) : item.total;

        const formattedRate = formatNumberWithCommas(item.rate);
        const formattedTotal = formatNumberWithCommas(total);

        const totalCellClass = total < 0 ? 'negative' : '';

        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.quantity} hour(s)</td>
            <td>${formattedRate}.00 DKK</td>
            <td class="${totalCellClass}">${formattedTotal}.00 DKK</td>
        `;
        lineItemsTable.appendChild(row);
        totalAmount += parseFloat(total);
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Invalid date format');
            return dateString; // Return the original string if the date is invalid
        }
    
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
    
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        // Add ordinal suffix to the day
        const ordinalSuffix = getOrdinalSuffix(day);
    
        return `${month} ${day}${ordinalSuffix}, ${year}`;
    }
    
    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th'; // Handle 11th, 12th, 13th, etc.
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    // Update total amount
    const totalAmountElement = document.getElementById('totalAmount');
    if (totalAmountElement) {
        const formattedTotalAmount = formatNumberWithCommas(totalAmount);

        totalAmountElement.textContent = `${formattedTotalAmount}.00 DKK`;
    } if (totalAmount < 0) {
        totalAmountElement.classList.add('negative'); // Add red color if total is negative
    } else {
        console.error('Element with id "totalAmount" not found');
    }
});

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

document.getElementById('printInvoiceBtn').addEventListener('click', function () {
    window.print();
});