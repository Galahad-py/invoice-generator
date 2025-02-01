document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.generateInvoiceBtn').addEventListener('click', function(event) {

        event.preventDefault();
    
        // validate the form
        if (!validateForm()) {
            alert('Please fill out all required fields.');
            return;
        }
    
        
    
        // Capture form data
        const invoiceNumber = document.getElementById('invoiceNumber').value;
        const invoiceDate = document.getElementById('invoiceDate').value;
        const paymentConditions = document.getElementById('paymentConditions').value;
        const latestPaymentDate = document.getElementById('latestPaymentDate').value;
        const invoicedAmount = document.getElementById('invoicedAmount').value;
        const clientName = document.getElementById('clientName').value;
        const clientAddress = document.getElementById('clientAddress').value;
        const clientState = document.getElementById('clientState').value;
        const yourReference = document.getElementById('yourReference').value;
        const ourReference = document.getElementById('ourReference').value;
        const workTitle = document.getElementById('workTitle').value;
    
        // Capture line items
        const lineItems = [];
        const lineItemElements = document.querySelectorAll('.line-item');
        lineItemElements.forEach(item => {
            const description = item.querySelector('.description').value;
            const quantity = item.querySelector('.quantity').value;
            const rate = item.querySelector('.rate').value;
            const total = quantity * rate;
    
            lineItems.push({
                description,
                quantity,
                rate,
                total,
            });
        });
    
        // Store data in localStorage
        localStorage.setItem('invoiceNumber', invoiceNumber);
        localStorage.setItem('invoiceDate', invoiceDate);
        localStorage.setItem('paymentConditions', paymentConditions);
        localStorage.setItem('latestPaymentDate', latestPaymentDate);
        localStorage.setItem('invoicedAmount', invoicedAmount);
        localStorage.setItem('clientName', clientName);
        localStorage.setItem('clientAddress', clientAddress);
        localStorage.setItem('clientState', clientState);
        localStorage.setItem('yourReference', yourReference);
        localStorage.setItem('ourReference', ourReference);
        localStorage.setItem('workTitle', workTitle);
        localStorage.setItem('lineItems', JSON.stringify(lineItems));
    
        // Optional: Redirect to the invoice page
        window.location.href = 'invoice.html'; // Replace with your invoice page URL
    });
});


// Function to validate the form
function validateForm() {
    const requiredFields = document.querySelectorAll('#invoiceForm [required]');
    for (const field of requiredFields) {
        if (!field.value.trim()) {
            return false; // Return false if any required field is empty
        }
    }
    return true; // Return true if all required fields are filled
}

// Add event listener for the "Add Another Item" button
document.getElementById('addItemBtn').addEventListener('click', function () {
    const lineItemsContainer = document.getElementById('lineItems');

    // Create a new line item
    const newLineItem = document.createElement('div');
    newLineItem.classList.add('line-item');

    newLineItem.innerHTML = `
        <label for="description">Description:</label>
        <input type="text" name="description" class="description" required>

        <label for="quantity">Quantity:</label>
        <input type="number" name="quantity" class="quantity" required min="0">

        <label for="rate">Rate:</label>
        <input type="number" name="rate" class="rate" required min="0">

        <button type="button" class="removeItemBtn">Remove</button>
    `;

    // Append the new line item to the container
    lineItemsContainer.appendChild(newLineItem);

    // Add event listener to the "Remove" button
    newLineItem.querySelector('.removeItemBtn').addEventListener('click', function () {
        lineItemsContainer.removeChild(newLineItem);
    });
});