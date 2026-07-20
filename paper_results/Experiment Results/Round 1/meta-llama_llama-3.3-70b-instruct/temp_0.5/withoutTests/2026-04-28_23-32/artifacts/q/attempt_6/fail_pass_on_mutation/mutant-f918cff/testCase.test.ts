import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject the promise when an exception is thrown in the promise descriptor', () => {
        expect.assertions(1);
        const promise = q.Promise((resolve, reject) => {
            try {
                throw new Error("Test error");
            } catch (error) {
                // In the mutated code, the promiseDispatch function is not called with the reject callback
                // So, we call reject here to make the test case fail on the mutated code
                reject(error);
            }
        });
        return promise.then(() => {
            throw new Error("Promise should have been rejected");
        }, (error) => {
            expect(error.message).toBe("Test error");
        });
    });
});