import { Client } from "pg";

describe('POST api/organization', () => {

    beforeAll(async () => {
        const client = new Client({ connectionString: "postgres://postgres:postgres@localhost:5432/postgres" });
        await client.connect()
        await client.query('TRUNCATE TABLE users')
        await client.end()
    })

    it("succeeds with correct payload", async () => {
        const response = await requestName("Pedro")
        expect(response.status).toBe(200)
    })
})

async function requestName(name: string) {
        const url = 'http://localhost:3000/api/organization';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: `{"name":"${name}"}`
        };

        return await fetch(url, options);
    }