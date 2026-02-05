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
        const url = 'http://localhost:3000/api/auth/signup/';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{"email":"teoemail.com","password":"Teodoro17"}'
        };

        const response = await fetch(url, options);
        const data = await response.json();

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
        const data = await response.json();

        expect(response.status).toBe(400)
    })
    
    it("fails with wrong email (without com)", async () => {
        const url = 'http://localhost:3000/api/auth/signup/';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{"email":"teo@email.","password":"Teodoro17"}'
        };

        const response = await fetch(url, options);
        const data = await response.json();

        expect(response.status).toBe(400)
    })

    it("fails with wrong password (without Uppercase)", async () => {
        const url = 'http://localhost:3000/api/auth/signup/';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{"email":"teo@email.com","password":"teodoro17"}'
        };

        const response = await fetch(url, options);
        const data = await response.json();

        expect(response.status).toBe(400)
    })

    it("fails with wrong password (without at least 8 characters)", async () => {
        const url = 'http://localhost:3000/api/auth/signup/';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{"email":"teo@email.com","password":"Teo17"}'
        };

        const response = await fetch(url, options);
        const data = await response.json();

        expect(response.status).toBe(400)
    })

        it("fails with wrong password (without numbers)", async () => {
        const url = 'http://localhost:3000/api/auth/signup/';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{"email":"teo@email.com","password":"Teodoroo"}'
        };

        const response = await fetch(url, options);
        const data = await response.json();

        expect(response.status).toBe(400)
    })


});