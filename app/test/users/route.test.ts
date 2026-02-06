import { Client } from "pg";

describe('GET api/users', () => {

    beforeAll( async () => {
        const client = new Client({ connectionString: "postgres://postgres:postgres@localhost:5432/postgres" });
        await client.connect()
        await client.query('TRUNCATE TABLE users')
        await client.end()

        await requestSignUp("teste1@email.com", "Teodoro17")
        await requestSignUp("teste2@email.com", "Teodoro17")
        await requestSignUp("teste3@email.com", "Teodoro17")

    })

    it("succeeds with correct payload", async () => {
        const url = 'http://localhost:3000/api/users';
        const options = {
            method: 'GET'
        };
        const response = await fetch(url, options);
        expect(response.status).toBe(200)
        expect(await response.json()).toHaveLength(3)
    })



    async function requestSignUp(email: string, password: string) {
        const url = 'http://localhost:3000/api/auth/signup/';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: `{"email":"${email}","password":"${password}"}`
        };

        return await fetch(url, options);
    }


});