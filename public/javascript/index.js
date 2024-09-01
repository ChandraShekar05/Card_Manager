document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.querySelector('#usersTable tbody');
    const createModal = document.getElementById('createModal');
    const userModal = document.getElementById('userModal');
    const updateModal = document.getElementById('updateModal');
    const deleteModal = document.getElementById('deleteModal');
    const modals = [createModal, userModal, updateModal, deleteModal];
    const closeButtons = document.querySelectorAll('.close');

    // Fetch all users and populate the table
    const fetchUsers = async () => {
        try {
            const response = await fetch('/admin/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            // console.log(users);
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                `;
                userTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Create a new user
    document.getElementById('createUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const user = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        try {
            await fetch('/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            alert('User created successfully.');
            fetchUsers();
            fetchStatistics();
        } catch (error) {
            console.error('Error creating user:', error);
        }
        document.getElementById('createUserForm').reset();
        createModal.style.display = 'none';
    });

    // Update an existing user
    document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const usernameElement = document.getElementById('update-username').value;
        const passwordElement = document.getElementById('update-password').value;

        if (!usernameElement || !passwordElement) {
            console.error('Form elements not found');
            return;
        }
        console.log(usernameElement, passwordElement);
        const user = {
            username: usernameElement,
            password: passwordElement
        };

        try {
            await fetch(`/admin/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            alert('User updated successfully');
            fetchUsers();
            fetchStatistics();
        } catch (error) {
            console.error('Error updating user:', error);
        }

        document.getElementById('updateUserForm').reset();
        updateModal.style.display = 'none';
    });

    // Delete a user
    document.getElementById('deleteUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('delete-username').value;
        try {
            await fetch(`/admin/users/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
            alert('User deleted successfully');
            fetchUsers();
            fetchStatistics();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        document.getElementById('deleteUserForm').reset();
        deleteModal.style.display = 'none';
    });

    async function fetchStatistics() {
        try {
            const response = await fetch('/admin/analyze');
            if (response.ok) {
                const results = await response.json();
                document.getElementById('total-users').textContent = results.totalUsers;
                document.getElementById('total-cards').textContent = results.totalCards;
            } else {
                console.error('Failed to fetch analysis');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    // Event listeners for buttons to open modals
    document.getElementById('createBtn').onclick = () => createModal.style.display = 'block';
    document.getElementById('readBtn').onclick = async () => {
        await fetchUsers();
        userModal.style.display = 'block';
    };
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

    fetchStatistics();
    // Initial fetch of all users
    fetchUsers();
});