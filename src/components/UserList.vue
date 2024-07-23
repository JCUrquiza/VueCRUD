
<template>
    <div class="max-w-5xl mx-auto mt-10 bg-gradient-to-r from-sky-100 via-blue-100 to-green-100 p-8 rounded-lg">

        <h1 class="text-3xl font-bold mb-6">Lista de Usuarios</h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
      
            <div>
                <label for="name" class="flex justify-start text-sm font-medium text-gray-700">Nombre:</label>
                <input
                    type="text"
                    v-model="form.name"
                    id="name"
                    required
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                />
                <span v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</span>
            </div>

            <div>
                <label for="email" class="flex justify-start text-sm font-medium text-gray-700">Email:</label>
                <input
                    type="email"
                    v-model="form.email"
                    id="email"
                    required
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>
            </div>

            <div>
                <label for="street" class="flex justify-start text-sm font-medium text-gray-700">Calle:</label>
                <input
                    type="text"
                    v-model="form.address.street"
                    id="street"
                    required
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span v-if="streetError" class="text-red-500 text-sm">{{ streetError }}</span>
            </div>

            <div>
                <label for="lat" class="flex justify-start text-sm font-medium text-gray-700">Latitud:</label>
                <input
                    type="text"
                    v-model="form.address.geo.lat"
                    id="lat"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label for="lng" class="flex justify-start text-sm font-medium text-gray-700">Longitud:</label>
                <input
                    type="text"
                    v-model="form.address.geo.lng"
                    id="lng"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label for="phone" class="flex justify-start text-sm font-medium text-gray-700">Teléfono:</label>
                <input
                    type="text"
                    v-model="form.phone"
                    id="phone"
                    required
                    maxlength="10"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span v-if="phoneError" class="text-red-500 text-sm">{{ phoneError }}</span>
            </div>

            <div>
                <label for="website" class="flex justify-start text-sm font-medium text-gray-700">Sitio Web:</label>
                <input
                    type="text"
                    v-model="form.website"
                    id="website"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span v-if="websiteError" class="text-red-500 text-sm">{{ websiteError }}</span>
            </div>

            <div>
                <label for="companyName" class="flex justify-start text-sm font-medium text-gray-700">Nombre de la Compañía:</label>
                <input
                    type="text"
                    v-model="form.company.name"
                    id="companyName"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span v-if="companyNameError" class="text-red-500 text-sm">{{ companyNameError }}</span>
            </div>

            <div>
                <label for="companyCatchPhrase" class="flex justify-start text-sm font-medium text-gray-700">Eslogan de la Compañía:</label>
                <input
                    type="text"
                    v-model="form.company.catchPhrase"
                    id="companyCatchPhrase"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span v-if="companyCatchPhraseError" class="text-red-500 text-sm">{{ companyCatchPhraseError }}</span>
            </div>

            <div class="flex justify-end space-x-4 mt-4">
                <button
                    type="submit"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {{ isEditing ? 'Actualizar' : 'Agregar' }}
                </button>
                <button
                    type="button"
                    @click="resetForm"
                    class="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Cancelar
                </button>
            </div>
        </form>

        <ul class="mt-8 space-y-2 w-full">
            <li
                v-for="user in users"
                :key="user.id"
                class="flex justify-between items-center p-4 w-full bg-white rounded-lg shadow-md"
            >
                <div class="flex-grow">
                    {{ user.name }} - {{ user.email }} - {{ user.address.street }} - 
                    {{ user.address.geo.lat }}, {{ user.address.geo.lng }} - 
                    {{ user.phone }} - {{ user.website }} - 
                    {{ user.company.name }} - {{ user.company.catchPhrase }}
                </div>
                <div class="flex-shrink-0 space-x-2">
                    <button
                        @click="editUser(user)"
                        class="px-2 py-1 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        Editar
                    </button>
                    <button
                        @click="deleteUser(user.id)"
                        class="px-2 py-1 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Eliminar
                    </button>
                </div>
            </li>
        </ul>
    </div>

    <ToastContainer />
</template>


<script>
import axios from 'axios';
import { toast } from '../main';

export default {
    // En la sección data del componente
    data() {
        return {
            users: [],
            form: {
                id: null,
                name: '',
                email: '',
                address: {
                    street: '',
                    geo: {
                        lat: '',
                        lng: ''
                    }
                },
                phone: '',
                website: '',
                company: {
                    name: '',
                    catchPhrase: ''
                }
            },
            isEditing: false,
            nameError: '',
            emailError: '',
            streetError: '',
            phoneError: '',
            websiteError: '',
            companyNameError: '',
            companyCatchPhraseError: '',
            formTouched: false
        };
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                this.users = response.data.map(user => ({
                    ...user,
                    address: {
                        ...user.address,
                        geo: {
                            lat: user.address.geo.lat,
                            lng: user.address.geo.lng
                        }
                    },
                    company: {
                        name: user.company.name,
                        catchPhrase: user.company.catchPhrase
                    }
                }));
                console.log(this.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }

        },
        handleSubmit() {
            this.formTouched = true;
            if (this.validateForm()) {
                if (this.isEditing) {
                    this.updateUser();
                } else {
                    this.addUser();
                }
            } else {
                toast.error('No se puede realizar el guardado, revisa tus datos', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        },

        validateForm() {
            this.nameError = '';
            this.emailError = '';
            this.streetError = '';
            this.phoneError = '';
            this.websiteError = '';
            this.latError = '';
            this.lngError = '';
            this.companyNameError = '';
            this.companyCatchPhraseError = '';

            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿÑñ\s]+$/;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const streetRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿÑñ\s]+$/;
            const phoneRegex = /^\d{10}$/;
            const websiteRegex = /^https:\/\/[A-Za-z0-9.-]+\.[a-zA-Z]{2,}(\/[A-Za-z0-9._~:/?#@!$&'()*+,;=-]*)?$/;
            
            // Validación de campos
            let isValid = true;

            if (!nameRegex.test(this.form.name)) {
                this.nameError = 'El nombre solo puede contener letras, incluyendo acentos y la letra "ñ"';
                isValid = false;
            } else if (this.formTouched && !this.form.name) {
                this.nameError = 'El nombre es requerido';
                isValid = false;
            }

            if (!emailRegex.test(this.form.email)) {
                this.emailError = 'Por favor, ingrese un correo válido, ejemplo: algo24deejemplo@correo.com';
                isValid = false;
            } else if (this.formTouched && !this.form.email) {
                this.emailError = 'El email es requerido';
                isValid = false;
            }

            if (!streetRegex.test(this.form.address.street)) {
                this.streetError = 'La calle solo puede contener caracteres alfanuméricos';
                isValid = false;
            } else if (this.formTouched && !this.form.address.street) {
                this.streetError = 'La calle es requerida';
                isValid = false;
            }

            if (!phoneRegex.test(this.form.phone)) {
                this.phoneError = 'El teléfono debe contener solo números y tener 10 dígitos';
                isValid = false;
            } else if (this.formTouched && !this.form.phone) {
                this.phoneError = 'El teléfono es requerido';
                isValid = false;
            }

            if (!websiteRegex.test(this.form.website)) {
                this.websiteError = 'El sitio web debe usar el esquema https y puede contener caracteres alfanuméricos y caracteres especiales';
                isValid = false;
            } else if (this.formTouched && !this.form.website) {
                this.websiteError = 'El sitio web es requerido';
                isValid = false;
            }

            return isValid;
        },

        addUser() {
            const newUser = {
                id: Date.now(),
                name: this.form.name,
                email: this.form.email,
                address: {
                    street: this.form.address.street,
                    geo: {
                        lat: this.form.address.geo.lat,
                        lng: this.form.address.geo.lng
                    }
                },
                phone: this.form.phone,
                website: this.form.website,
                company: {
                    name: this.form.company.name,
                    catchPhrase: this.form.company.catchPhrase
                }
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
                this.users.splice(index, 1, {
                    ...this.form,
                    address: {
                        ...this.form.address,
                        geo: {
                            lat: this.form.address.geo.lat,
                            lng: this.form.address.geo.lng
                        }
                    },
                    company: {
                        name: this.form.company.name,
                        catchPhrase: this.form.company.catchPhrase
                    }
                });
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

            
            // Mostrar notificación de éxito
            toast.success('Guardado Exitosamente', {
                position: 'top-right',
                autoClose: 3000, // Tiempo en milisegundos
            });
        },
        resetForm() {
            this.form = {
        id: null,
        name: '',
        email: '',
        address: {
            street: '',
            geo: {
                lat: '',
                lng: ''
            }
        },
        phone: '',
        website: '',
        company: {
            name: '',
            catchPhrase: ''
        }
    };
    this.isEditing = false;
    this.nameError = '';
    this.emailError = '';
    this.streetError = '';
    this.phoneError = '';
    this.websiteError = '';
    this.latError = '';
    this.lngError = '';
    this.companyNameError = '';
    this.companyCatchPhraseError = '';
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
    padding: 10px 0;
}
button {
    margin-left: 10px;
}
span {
    color: red;
}
</style>

