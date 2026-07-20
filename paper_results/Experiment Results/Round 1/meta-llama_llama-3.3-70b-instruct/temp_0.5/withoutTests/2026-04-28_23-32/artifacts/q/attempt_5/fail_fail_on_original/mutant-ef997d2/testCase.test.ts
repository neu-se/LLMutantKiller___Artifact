describe("Q", () => {
    it("should return a promise with inspect method that returns an object with state and value", () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.master({});
        expect(promise.inspect).toBeDefined();
        const inspected = promise.inspect();
        expect(typeof inspected).toBe("object");
    });
});