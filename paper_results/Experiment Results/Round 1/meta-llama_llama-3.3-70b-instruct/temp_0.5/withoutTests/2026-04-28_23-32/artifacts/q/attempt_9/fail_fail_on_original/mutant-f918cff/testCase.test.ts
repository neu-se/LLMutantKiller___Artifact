import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject the promise when an exception is thrown in the promise descriptor', () => {
        const promise = q.Promise((resolve, reject) => {
            throw new Error("Test error");
        });
        let catchCalled = false;
        promise.catch((error) => {
            catchCalled = true;
            if (error.message !== "Test error") {
                throw new Error("Unexpected error message");
            }
        });
        // In the mutated code, the promiseDispatch function is not called with the reject callback
        // So, we check if the catch block is called
        expect(catchCalled).toBe(true);
    });
});