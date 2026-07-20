describe("Q tests", () => {
    it("should return object keys", async () => {
        const obj = { a: 1, b: 2, c: 3 };
        const Q = require('./q.js');
        const promise = Q(obj).dispatch("keys", []);
        const result = await promise;
        expect(result.length).toBeGreaterThan(0);
    });
});