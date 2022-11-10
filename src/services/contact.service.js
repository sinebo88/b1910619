const knex = require('../database/knex');
class ContactService {
    async deleteAll() {
        return await this.contacts.del();
    }

    async allFavorite() {
        return await this.contacts.where('favorite', 1).select('*');
    }

    async delete(id) {
        return await this.contacts.where('id', id).del();
    }


    async update(id, payload) {
        const update = this.#getContact(payload);
        return await this.contacts.where('id', id).update(update);
    }

    async findById(id) {
        return await this.contacts.where('id', id).select('*').first();
    }

    async all() {
        return await this.contacts.select('*');
    }
    async findByName(name) {
        return await this.contacts
            .where('name', 'like', `%${name}`)
            .select('*');
    }

    constructor() {
        this.contacts = knex('contacts');
    }



    #getContact(payload) {
        const contact = {...payload };
        const contactProperties = [
            "name", "email", "address", "phone", "favorite"
        ];
        // Remove non-contact properties
        Object.keys(contact).forEach(function(key) {
            if (contactProperties.indexOf(key) == -1) {
                delete contact[key];
            }
        });
        return contact;
    }
    async create(payload) {
            const contact = this.#getContact(payload);
            const [id] = await this.contacts.insert(contact);
            return { id, ...contact };
        }
        // Define methods for accessing the database
}
module.exports = ContactService;