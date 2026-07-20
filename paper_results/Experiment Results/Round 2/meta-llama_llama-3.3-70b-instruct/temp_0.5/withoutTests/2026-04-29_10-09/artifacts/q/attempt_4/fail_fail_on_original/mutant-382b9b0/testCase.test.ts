describe("Q", () => {
    it("should call nodeify function with object and nodeback", () => {
        const object = "test object";
        const nodeback = jest.fn();
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q(object);
        promise.nodeify(nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, object);
    });
});