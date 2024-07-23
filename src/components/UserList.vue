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
                <span v-if="emailError">{{ emailError }}</span>
            </div>

            <div>
                <label for="street">Calle:</label>
                <input type="text" v-model="form.address.street" id="street" required />
                <span v-if="streetError">{{ streetError }}</span>
            </div>

            <div>
                <label for="phone">Teléfono:</label>
                <input type="text" v-model="form.phone" id="phone" required />
                <span v-if="phoneError">{{ phoneError }}</span>
            </div>

            <div>
                <label for="website">Sitio Web:</label>
                <input type="text" v-model="form.website" id="website" required />
                <span v-if="websiteError">{{ websiteError }}</span>
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
            nameError: '',
            emailError: '',
            streetError: '',
            phoneError: '',
            websiteError: ''
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
            this.emailError = '';
            this.streetError = '';
            this.phoneError = '';
            this.websiteError = '';

            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿÑñ\s]+$/;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const streetRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿÑñ\s]+$/;
            const phoneRegex = /^\d{10}$/;
            const websiteRegex = /^https:\/\/[A-Za-z0-9.-]+\.[a-zA-Z]{2,}(\/[A-Za-z0-9._~:/?#@!$&'()*+,;=-]*)?$/;

            if (!nameRegex.test(this.form.name)) {
                this.nameError = 'El nombre solo puede contener letras, incluyendo acentos y ñ';
                return false;
            }

            if (!emailRegex.test(this.form.email)) {
                this.emailError = 'Por favor, ingrese un correo válido, ejemplo: algo24deejemplo@correo.com';
                return false;
            }

            if (!streetRegex.test(this.form.address.street)) {
                this.streetError = 'La calle solo puede contener caracteres alfanuméricos';
                return false;
            }

            if (!phoneRegex.test(this.form.phone)) {
                this.phoneError = 'El teléfono debe contener solo números y tener 10 dígitos';
                return false;
            }

            if (!websiteRegex.test(this.form.website)) {
                this.websiteError = 'El sitio web debe usar el esquema https y puede contener caracteres alfanuméricos y caracteres especiales';
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


