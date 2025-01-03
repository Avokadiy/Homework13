import { fetchUsers } from "../src/script.mjs";
import { expect } from "chai";
import sinon from "sinon";

describe('Тестирование подключения к API', () => {

    // Проверка подключения к API
    it('should return all users', async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        expect(response.status).to.eql(200);
    })

    // Проверка возвращения из API массива данных
    it('should return an array of users', async () => {
        const users = await fetchUsers();
        expect(users).to.be.an('array');
    });

    // Проверка возвращения верного списка пользователей
    it('should return the same users as the API returns', async () => {
        let fetchStub = sinon.stub(global, 'fetch');
        try {
            const testUsers = [
            { id: 1, name: 'Leanne Graham'},
            { id: 2, name: 'Ervin Howell'},
            ];
            fetchStub.resolves({
                ok: true,
                json: async () => testUsers,
            });

            const users = await fetchUsers();
            expect(users).to.have.lengthOf(2);
            expect(users).to.deep.equal(testUsers);
        } finally {
            fetchStub.restore();
        }
    })

    // Проверка вывода ошибки при невозможности подключения к API
    it('should return undefined when the API fails', async () => {
        let fetchStub = sinon.stub(global, 'fetch');
        try {
            fetchStub.rejects(new Error('Network error'));
            const users = await fetchUsers();
            expect(users).to.be.undefined;
        } finally {
            fetchStub.restore();
        }
    })
})

// интеграционное тестирование

// проверить корректность вывода users

// подключение к API

// проверить типы данных