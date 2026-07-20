describe("Q", () => {
    it("should call nodeify function with object and nodeback", () => {
        const Q = require('./q.js');
        const object = "test object";
        const nodeback = jest.fn();
        const promise = Q(object);
        promise.nodeify(nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, object);
    });
});