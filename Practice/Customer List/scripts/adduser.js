document.addEventListener('DOMContentLoaded', function() {
    function showForm() {
        const formContainer = document.createElement('div');
        formContainer.classList.add('popup-form');

        formContainer.innerHTML = `
            <div class="create-invoice-container">
                <h2>Create New Invoice</h2>
                <form class="form-invoice">
                    <div class="user-img">
                        <div class="image">
                            <img src="" alt="add image">
                            <input type="file" id="file-upload" name="file-upload">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="invoice-id">Invoice Id</label>
                        <input type="text" id="invoice-id" name="invoice-id" placeholder="#8181">
                    </div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" id="date" name="date">
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="QuanDoan">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="name@gmail.com">
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" id="address" name="address" placeholder="Name City">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-invoice-create">Invoice Create</button>
                    </div>
                </form>
            </div>
        `;

        const container = document.querySelector('.container');
        container.appendChild(formContainer);
        container.classList.add('blurred');

        formContainer.addEventListener('click', function(event) {
            if (event.target === formContainer) {
                container.removeChild(formContainer);
                container.classList.remove('blurred');
            }
        });

        // Xử lý submit form
        const form = formContainer.querySelector('.form-invoice');
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn gửi form theo cách mặc định

            // Thu thập dữ liệu từ form
            const invoiceId = form.querySelector('#invoice-id').value;
            const date = form.querySelector('#date').value;
            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            const address = form.querySelector('#address').value;

            // Thêm dữ liệu vào danh sách hóa đơn
            addInvoiceToList(invoiceId, date, name, email, address);

            // Đóng form
            container.removeChild(formContainer);
            container.classList.remove('blurred');
        });
    }

    function addInvoiceToList(invoiceId, date, name, email, address) {
        const cardContainer = document.querySelector('.container');
        const newCard = document.createElement('div');
        newCard.classList.add('card');
    
        const newInfo = document.createElement('div');
        newInfo.classList.add('info');
        
    
        newInfo.innerHTML = `
            <input type="checkbox" class="checkbox">
            <div class="invoice">${invoiceId}</div>
            <div class="profile-pic">
                <img src="" alt="Profile Picture">
                <div class="name">${name}</div>
            </div>
            <div class="email">${email}</div>
            <div class="date"><i class="fas fa-calendar-alt"></i> ${date}</div>
            <div class="status">Pending</div>
            <div class="star">
                <button class="special"><i class="fas fa-star"></i></button>
            </div>
            <div class="menuu">
                <div class="dots">•••</div>
                <div class="menu-itemss">
                    <div class="menu-itemm">Edit</div>
                    <div class="menu-itemm">Delete</div>
                </div>
            </div>
        `;
    
        newCard.appendChild(newInfo);
        cardContainer.appendChild(newCard);
        
    }
    

    const addNewButton = document.querySelector('.addBtn');
    addNewButton.addEventListener('click', showForm);
});
