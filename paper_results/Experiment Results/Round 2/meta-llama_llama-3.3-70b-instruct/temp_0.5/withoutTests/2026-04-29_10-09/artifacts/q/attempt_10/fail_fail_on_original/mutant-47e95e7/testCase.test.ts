describe("Q Promise", () => {
    it("should return the promise itself when the state is 'pending' or 'rejected'", () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.reject("Test rejection");
        expect(promise.valueOf()).toBe(promise);
    });
});