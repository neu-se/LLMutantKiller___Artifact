describe("Q function", () => {
    it("should return a promise that has a then method and inspect method", () => {
        const q = require('../../../../q.js');
        const promise = q(10);
        expect(typeof promise.then).toBe('function');
        expect(typeof promise.inspect).toBe('function');
    });
});