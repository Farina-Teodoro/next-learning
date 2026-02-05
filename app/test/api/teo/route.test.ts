import { request } from "http";

describe('POST api/auth/signup', () => {

    it("succeeds with correct payload", async () => {
        const url = 'http://localhost:3000/api/auth/signup/';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{"email":"teo@email.com","password":"Teodoro17"}'
        };

        const response = await fetch(url, options);
        const data = await response.json();

        expect(response.status).toBe(200)
        expect(data).toEqual({ data: { email: 'teo@email.com', password: 'Teodoro17' } })
    })

    it("fails with wrong email (without @)", async () => {
        const response = await requestSignUp("teoemail.com", "Teodoro17")
        expect(response.status).toBe(400)
    })

    it("fails with wrong email (without .)", async () => {
        const url = 'http://localhost:3000/api/auth/signup/';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{"email":"teo@emailcom","password":"Teodoro17"}'
        };

        const response = await fetch(url, options);

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