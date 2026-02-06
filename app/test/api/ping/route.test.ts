describe('GET api/ping', () => {

    it("succeeds with correct payload", async () => {
        const url = 'http://localhost:3000/api/ping';
        const options = { method: 'GET', headers: { 'content-type': 'application/json' }, body: undefined };
        
        const response = await fetch(url, options)
        const data = await response.json();
        expect(response.status).toBe(200)
        expect(data.message).toBe("Hello world!")
    })

})