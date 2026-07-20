import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject the promise when an exception is thrown in the promise descriptor', (done) => {
        const promise = q.Promise((resolve, reject) => {
            throw new Error("Test error");
        });
        let catchCalled = false;
        promise.catch((error) => {
            catchCalled = true;
            if (error.message !== "Test error") {
                throw new Error("Unexpected error message");
            }
            expect(catchCalled).toBe(true);
            done();
        });
        setTimeout(() => {
            if (!catchCalled) {
                throw new Error("Catch block was not called");
            }
        }, 100);
    });
});