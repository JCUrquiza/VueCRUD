<template>
    <div>
        <h1>Lista de Usuarios</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name">Nombre:</label>
                <input type="text" v-model="form.name" id="name" required />
                <span v-if="nameError">{{ nameError }}</span>
            </div>

            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="form.email" id="email" required />
            </div>

            <div>
                <label for="street">Calle:</label>
                <input type="text" v-model="form.address.street" id="street" required />
            </div>

            <div>
                <label for="phone">Teléfono:</label>
                <input type="text" v-model="form.phone" id="phone" required />
            </div>

            <div>
                <label for="website">Sitio Web:</label>
                <input type="text" v-model="form.website" id="website" required />
            </div>

            <button type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }}</button>
            <button type="button" @click="resetForm">Cancelar</button>
        </form>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }} - {{ user.email }} - {{ user.address.street }} - {{ user.phone }} - {{ user.website }}
                <button @click="editUser(user)">Editar</button>
                <button @click="deleteUser(user.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
            form: {
                id: null,
                name: '',
                email: '',
                address: {
                    street: ''
                },
                phone: '',
                website: ''
            },
            isEditing: false,
            nameError: ''
        };
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                this.users = response.data;
                console.log(this.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        handleSubmit() {
            if (this.validateForm()) {
                if (this.isEditing) {
                    this.updateUser();
                } else {
                    this.addUser();
                }
            }
        },
        validateForm() {
            this.nameError = '';
            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿÑñ\s]+$/;
            if (!nameRegex.test(this.form.name)) {
                this.nameError = 'El nombre solo puede contener letras, incluyendo acentos y ñ';
                return false;
            }
            return true;
        },
        addUser() {
            const newUser = {
                id: Date.now(),
                name: this.form.name,
                email: this.form.email,
                address: {
                    street: this.form.address.street
                },
                phone: this.form.phone,
                website: this.form.website
            };
            this.users.push(newUser);
            this.saveUsers();
            this.resetForm();
        },
        editUser(user) {
            this.form = { ...user, address: { ...user.address } };
            this.isEditing = true;
        },
        updateUser() {
            const index = this.users.findIndex(u => u.id === this.form.id);
            if (index !== -1) {
                this.users.splice(index, 1, { ...this.form, address: { ...this.form.address } });
                this.saveUsers();
                this.resetForm();
            }
        },
        deleteUser(id) {
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        },
        saveUsers() {
            const dataStr = JSON.stringify(this.users);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const exportFileDefaultName = 'users.json';

            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        },
        resetForm() {
            this.form = {
                id: null,
                name: '',
                email: '',
                address: {
                    street: ''
                },
                phone: '',
                website: ''
            };
            this.isEditing = false;
            this.nameError = '';
        }
    }
};
</script>


<style scoped>
    h1 {
        font-family: Arial, sans-serif;
    }
    form {
        margin-bottom: 20px;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        padding: 5px 0;
    }
    button {
        margin-left: 10px;
    }
    span {
        color: red;
    }
</style>


