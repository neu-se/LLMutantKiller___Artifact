describe("Q Promise", () => {
    it("should throw an error when valueOf is called on a rejected promise", () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.reject("Test rejection");
        expect(() => promise.valueOf()).toThrowError();
    });
});