import { Q } from "../../../../../q.js";

describe('Q', () => {
    it('should reject a promise when done is true', () => {
        const promise = Q.defer();
        const done = true;
        const exception = new Error('Test error');

        promise.promiseDispatch = function(resolve, op, args) {
            if (op === "when" && args[1]) {
                try {
                    args[1](exception);
                } catch (e) {
                    if (done) {
                        // In the original code, this would return immediately
                        // In the mutated code, this would not return and would continue executing
                        return;
                    }
                    throw e;
                }
            }
        };

        promise.then(null, function(exception) {
            throw exception;
        });

        promise.reject(exception);

        // If the test reaches this point without throwing an error, it means the promise was not rejected
        // This should happen with the mutated code, but not with the original code
        expect(true).toBe(false);
    });
});