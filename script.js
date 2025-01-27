$(document).ready(function () {
    console.log("Script loaded successfully!");

    // Synchronize pre-existing rows with Local Storage on page load
    function synchronizePreloadedRows() {
        const orders = [];

        $('table tbody tr').each(function () {
            const orderId = $(this).find('td').eq(0).text().trim();
            const orderValue = $(this).find('td').eq(1).text().replace('$', '').trim();
            const orderQuantity = $(this).find('td').eq(2).text().trim();

            if (orderId && orderValue && orderQuantity) {
                orders.push({
                    orderId: orderId,
                    orderValue: parseFloat(orderValue),
                    orderQuantity: parseInt(orderQuantity, 10),
                });
            }
        });

        localStorage.setItem('orders', JSON.stringify(orders));
        console.log("Preloaded rows synchronized with Local Storage:", orders);
    }

    // Call synchronization on page load
    synchronizePreloadedRows();

    // Add a new editable row at the top
    $('.btn-primary').first().click(function () {
        console.log("Add Order button clicked");
        const newRow = `
            <tr>
                <td><input type="text" class="form-control form-control-sm order-id" placeholder="Order ID"></td>
                <td><input type="number" class="form-control form-control-sm order-value" placeholder="Order Value"></td>
                <td><input type="number" class="form-control form-control-sm order-quantity" placeholder="Quantity"></td>
                <td>
                    <button class="btn btn-sm btn-success add-btn">Add</button>
                </td>
            </tr>`;
        $('table tbody').prepend(newRow);
    });

    // Finalize the row when "Add" button is clicked
    $(document).on('click', '.add-btn', function () {
        const row = $(this).closest('tr');
        const orderId = row.find('.order-id').val().trim();
        const orderValue = row.find('.order-value').val().trim();
        const orderQuantity = row.find('.order-quantity').val().trim();

        if (!orderId || !orderValue || !orderQuantity) {
            alert('Please fill out all fields before adding.');
            return;
        }

        row.html(`
            <td>${orderId}</td>
            <td>$${orderValue}</td>
            <td>${orderQuantity}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </td>
        `);
        updateLocalStorage();
    });

    // Edit the row when "Edit" button is clicked
    $(document).on('click', '.edit-btn', function () {
        console.log("Edit button clicked");
        const row = $(this).closest('tr');
        const orderId = row.find('td').eq(0).text();
        const orderValue = row.find('td').eq(1).text().replace('$', '');
        const orderQuantity = row.find('td').eq(2).text();

        row.html(`
            <td><input type="text" class="form-control form-control-sm order-id" value="${orderId}"></td>
            <td><input type="number" class="form-control form-control-sm order-value" value="${orderValue}"></td>
            <td><input type="number" class="form-control form-control-sm order-quantity" value="${orderQuantity}"></td>
            <td>
                <button class="btn btn-sm btn-success save-btn">Save</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </td>
        `);
    });

    // Save the row when "Save" button is clicked
    $(document).on('click', '.save-btn', function () {
        const row = $(this).closest('tr');
        const orderId = row.find('.order-id').val().trim();
        const orderValue = row.find('.order-value').val().trim();
        const orderQuantity = row.find('.order-quantity').val().trim();

        if (!orderId || !orderValue || !orderQuantity) {
            alert('Please fill out all fields before saving.');
            return;
        }

        row.html(`
            <td>${orderId}</td>
            <td>$${orderValue}</td>
            <td>${orderQuantity}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </td>
        `);
        updateLocalStorage();
    });

    // Delete the row and update Local Storage
    $(document).on('click', '.delete-btn', function () {
        console.log("Delete button clicked");
        const row = $(this).closest('tr');
        const orderId = row.find('td').eq(0).text().trim();

        // Remove the row from the table
        row.remove();

        // Update Local Storage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders = orders.filter(order => order.orderId !== orderId);
        localStorage.setItem('orders', JSON.stringify(orders));
        console.log("Updated Local Storage after deletion:", orders);
    });

    // Update Local Storage with the current table data
    function updateLocalStorage() {
        const orders = [];

        $('table tbody tr').each(function () {
            const orderId = $(this).find('td').eq(0).text().trim();
            const orderValue = $(this).find('td').eq(1).text().replace('$', '').trim();
            const orderQuantity = $(this).find('td').eq(2).text().trim();

            if (orderId && orderValue && orderQuantity) {
                orders.push({
                    orderId: orderId,
                    orderValue: parseFloat(orderValue),
                    orderQuantity: parseInt(orderQuantity, 10),
                });
            }
        });

        localStorage.setItem('orders', JSON.stringify(orders));
        console.log("Updated Local Storage:", orders);
    }
});
