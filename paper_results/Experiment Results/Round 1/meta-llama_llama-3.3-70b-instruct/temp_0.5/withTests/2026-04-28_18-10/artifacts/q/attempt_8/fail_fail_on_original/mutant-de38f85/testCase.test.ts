describe("Promise", () => {
    it("should return the keys of an object", () => {
        const obj = { a: 1, b: 2 };
        const Q = require('../../../../q.js');
        return Q(obj).keys().then((keys) => {
            expect(keys).toEqual(["a", "b"]);
        });
    });
});