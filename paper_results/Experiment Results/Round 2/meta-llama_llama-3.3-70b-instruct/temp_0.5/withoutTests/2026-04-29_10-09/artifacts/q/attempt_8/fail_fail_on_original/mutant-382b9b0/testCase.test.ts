describe("Q", () => {
    it("should call nodeify function with object and nodeback", () => {
        const Q = require('./q.js');
        const object = "test object";
        const nodeback = jest.fn();
        const promise = Q(object);
        expect(() => promise.nodeify(nodeback)).not.toThrow();
    });
});