import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject the promise when an exception is thrown in the promise descriptor', () => {
        expect.assertions(1);
        const promise = Q.Promise({
            "when": function (resolve, reject) {
                throw new Error("Test error");
            }
        }, function fallback(op) {
            throw new Error("Promise does not support operation: " + op);
        });
        return promise.then(() => {
            throw new Error("Promise should have been rejected");
        }, (error) => {
            expect(error.message).toBe("Test error");
        });
    });
});