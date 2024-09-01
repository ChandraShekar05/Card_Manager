document.addEventListener('DOMContentLoaded', () => {
    const cardTableBody = document.querySelector('#cardTable tbody');
    const cardDetailsModal = document.getElementById('cardDetailsModal');
    const cardDetailsDiv = document.getElementById('cardDetails');
    const createModal = document.getElementById('createModal');
    const readModal = document.getElementById('cardModal');
    const readByIdModal = document.getElementById('readByIdModal');
    const updateModal = document.getElementById('updateModal');
    const updateCardForm = document.getElementById('updateCardForm');
    const fetchByIdForm = document.getElementById('fetchByIdForm');
    const deleteModal = document.getElementById('deleteModal');
    const modals = [createModal, readModal, readByIdModal, updateModal, deleteModal, cardDetailsModal];
    const closeButtons = document.querySelectorAll('.close');

    // Fetch all cards and populate the table
    const fetchCards = async () => {
        try {
            const response = await fetch('/api/cards');
            const cards = await response.json();
            cardTableBody.innerHTML = '';
            cards.forEach(card => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${card.id}</td>
                    <td>${card.card_number}</td>
                    <td>${card.cardholder_name}</td>
                    <td>${card.card_type}</td>
                    <td>${card.expiration_date}</td>
                    <td>${card.cvv}</td>
                    <td>${card.bank_name}</td>
                    <td>${card.issuing_country}</td>
                `;
                cardTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    // Create a new card
    document.getElementById('createCardForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const card = {
            card_number: document.getElementById('cardNumber').value,
            cardholder_name: document.getElementById('cardholderName').value,
            card_type: document.getElementById('cardType').value,
            expiration_date: document.getElementById('expirationDate').value,
            cvv: document.getElementById('cvv').value,
            bank_name: document.getElementById('bankName').value,
            issuing_country: document.getElementById('issuingCountry').value
        };
        try {
            await fetch('/api/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(card)
            });
            alert('Card created successfully.');
            fetchCards();
        } catch (error) {
            console.error('Error creating card:', error);
        }
        document.getElementById('createCardForm').reset();
        createModal.style.display = 'none';
    });

    // Display fetchById form when update button is clicked
    document.getElementById('updateBtn').addEventListener('click', () => {
        fetchByIdForm.style.display = 'block';
        updateCardForm.style.display = 'none';
    });

    // Fetch card details by ID and populate the update form
    fetchByIdForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cardId = document.getElementById('fetch_id').value;
        try {
            const response = await fetch(`/api/cards/${cardId}`);
            if (!response.ok) {
                alert('Invalid ID');
                return;
            }
            const cardArray = await response.json();
            console.log(cardArray);

            if (!cardArray || cardArray.length === 0) {
                alert('Invalid ID');
                return;
            }

            const card = cardArray[0];
            // Populate the update form with the fetched card details
            updateCardForm.elements['id'].value = card.id;
            updateCardForm.elements['update_cardNumber'].value = card.card_number;
            updateCardForm.elements['update_cardholderName'].value = card.cardholder_name;
            updateCardForm.elements['update_cardType'].value = card.card_type;
            updateCardForm.elements['update_expirationDate'].value = card.expiration_date;
            updateCardForm.elements['update_cvv'].value = card.cvv;
            updateCardForm.elements['update_bankName'].value = card.bank_name;
            updateCardForm.elements['update_issuingCountry'].value = card.issuing_country;
            fetchByIdForm.style.display = 'none';
            updateCardForm.style.display = 'flex';
            fetchByIdForm.reset();
        } catch (error) {
            console.error('Error fetching card details:', error);
        }
    });

    // Update an existing card
    document.getElementById('updateCardForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const cardId = document.getElementById('id').value;
        const card = {
            card_number: document.getElementById('update_cardNumber').value,
            cardholder_name: document.getElementById('update_cardholderName').value,
            card_type: document.getElementById('update_cardType').value,
            expiration_date: document.getElementById('update_expirationDate').value,
            cvv: document.getElementById('update_cvv').value,
            bank_name: document.getElementById('update_bankName').value,
            issuing_country: document.getElementById('update_issuingCountry').value
        };
        try {
            await fetch(`/api/cards/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(card)
            });
            alert('Card updated successfully');
            fetchCards();
        } catch (error) {
            console.error('Error updating card:', error);
        }
        document.getElementById('updateCardForm').reset();
        updateModal.style.display = 'none';
    });

    // Delete a card
    document.getElementById('deleteCardForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const cardId = document.getElementById('delete_id').value;
        try {
            await fetch(`/api/cards/${cardId}`, {
                method: 'DELETE'
            });
            alert('Card deleted successfully');
            fetchCards();
        } catch (error) {
            console.error('Error deleting card:', error);
        }
        document.getElementById('deleteCardForm').reset();
        deleteModal.style.display = 'none';
    });

    // Get card details by ID
    document.getElementById('getCardDetailsForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('get_id').value;
        try {
            const response = await fetch(`/api/cards/${id}`);
            if (!response.ok) {
                alert('Invalid ID');
                return;
            }
            const cardArray = await response.json();
            console.log(cardArray);

            if (!cardArray || cardArray.length === 0) {
                alert('Invalid ID');
                return;
            }

            const card = cardArray[0];
            cardDetailsDiv.innerHTML = `
                <h2>Card Details</h2>
                <p><strong>Card Number:</strong> ${card.card_number}</p>
                <p><strong>Cardholder Name:</strong> ${card.cardholder_name}</p>
                <p><strong>Card Type:</strong> ${card.card_type}</p>
                <p><strong>Expiration Date:</strong> ${card.expiration_date}</p>
                <p><strong>CVV:</strong> ${card.cvv}</p>
                <p><strong>Bank Name:</strong> ${card.bank_name}</p>
                <p><strong>Issuing Country:</strong> ${card.issuing_country}</p>
            `;
            cardDetailsModal.style.display = 'block';
        } catch (error) {
            console.error('Error fetching card details:', error);
        }
        document.getElementById('getCardDetailsForm').reset();
        readByIdModal.style.display = 'none';
    });

    // Event listeners for buttons to open modals
    document.getElementById('createBtn').onclick = () => createModal.style.display = 'block';
    document.getElementById('readBtn').onclick = async () => {
        await fetchCards();
        readModal.style.display = 'block';
    };
    document.getElementById('readByIdBtn').onclick = () => readByIdModal.style.display = 'block';
    document.getElementById('updateBtn').onclick = () => updateModal.style.display = 'block';
    document.getElementById('deleteBtn').onclick = () => deleteModal.style.display = 'block';

    // Close modals when clicking on close button or outside the modal
    closeButtons.forEach(button => {
        button.onclick = () => {
            modals.forEach(modal => modal.style.display = 'none');
        };
    });
    window.onclick = (event) => {
        if (modals.includes(event.target)) {
            modals.forEach(modal => modal.style.display = 'none');
        }
    };

    // Initial fetch of all cards
    fetchCards();
});