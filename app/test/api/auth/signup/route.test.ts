import { Client } from "pg";

describe('POST api/auth/signup', () => {

    beforeAll( async () => {
        const client = new Client({ connectionString: "postgres://postgres:postgres@localhost:5432/postgres" });
        await client.connect()
        await client.query('TRUNCATE TABLE users')
        await client.end()
    })

    it("succeeds with correct payload", async () => {
        const response = await requestSignUp("teo@email.com", "Teodoro17")
        expect(response.status).toBe(200)
    })

    it("fails (email is already registered)", async () => {
        const response = await requestSignUp("teo@email.com", "Teodoro17")
        expect(response.status).toBe(400)
        expect(await response.json()).toEqual({ "error": "user already exists" })
    })

    it("fails with wrong email (without @)", async () => {
        const response = await requestSignUp("teoemail.com", "Teodoro17")
        expect(response.status).toBe(400)
    })

    it("fails with wrong email (without .)", async () => {
        const response = await requestSignUp("teo@emailcom", "Teodoro17")
        expect(response.status).toBe(400)
    })

    it("fails with wrong email (without com)", async () => {
        const response = await requestSignUp("teo@email.", "Teodoro17")
        expect(response.status).toBe(400)
    })

    it("fails with wrong password (without Uppercase)", async () => {
        const response = await requestSignUp("teo@email.com", "teodoro17")
        expect(response.status).toBe(400)
    })

    it("fails with wrong password (without at least 8 characters)", async () => {
        const response = await requestSignUp("teo@email.com", "Teo17")
        expect(response.status).toBe(400)
    })

    it("fails with wrong password (without numbers)", async () => {
        const response = await requestSignUp("teo@email.com", "Teodoroo")
        expect(response.status).toBe(400)
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