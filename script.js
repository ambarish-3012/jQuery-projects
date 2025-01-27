$(document).ready(function () {
    console.log("Script loaded successfully!");

    // Add a new editable row at the top
    $('.btn-primary').first().click(function () {
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

        // Replace input fields with plain text and add action buttons
        row.html(`
            <td>${orderId}</td>
            <td>$${orderValue}</td>
            <td>${orderQuantity}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </td>
        `);
    });

    // Edit the row when "Edit" button is clicked
    $(document).on('click', '.edit-btn', function () {
        const row = $(this).closest('tr');
        const orderId = row.find('td').eq(0).text();
        const orderValue = row.find('td').eq(1).text().replace('$', '');
        const orderQuantity = row.find('td').eq(2).text();

        // Replace plain text with input fields
        row.html(`
            <td><input type="text" class="form-control form-control-sm order-id" value="${orderId}"></td>
            <td><input type="number" class="form-control form-control-sm order-value" value="${orderValue}"></td>
            <td><input type="number" class="form-control form-control-sm order-quantity" value="${orderQuantity}"></td>
            <td>
                <button class="btn btn-sm btn-success add-btn">Add</button>
            </td>
        `);
    });

    // Delete the row when "Delete" button is clicked
    $(document).on('click', '.delete-btn', function () {
        $(this).closest('tr').remove();
    });

    // Filter Orders based on slider value
    $('#orderValueSlider').on('input', function () {
        const filterValue = parseFloat($(this).val());
        console.log(`Filtering orders with value greater than: ${filterValue}`);

        $('table tbody tr').each(function () {
            const orderValueText = $(this).find('td').eq(1).text().replace('$', '').trim();
            const orderValue = parseFloat(orderValueText);

            if (orderValue > filterValue) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
