import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject the promise when an exception is thrown in the promise descriptor', () => {
        expect.assertions(1);
        const promise = new q.Promise((resolve, reject) => {
            throw new Error("Test error");
        });
        return promise.then(() => {
            throw new Error("Promise should have been rejected");
        }, (error) => {
            expect(error.message).toBe("Test error");
            expect(q.Promise.prototype.promiseDispatch).not.toHaveBeenCalledWith(null, "when", [null, expect.any(Function)]);
        });
    });
});