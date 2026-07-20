import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject with an error when an exception is thrown in the promise dispatch', () => {
        var promise = Q.Promise({
            "when": function (resolve, op, args) {
                try {
                    throw new Error("Test error");
                } catch (exception) {
                    resolve(exception);
                }
            }
        }, function fallback() {
            return this;
        }, function inspect() {
            return { state: "unknown" };
        });

        return promise.then(null, function (error) {
            expect(error.message).toBe("Test error");
        });
    });
});