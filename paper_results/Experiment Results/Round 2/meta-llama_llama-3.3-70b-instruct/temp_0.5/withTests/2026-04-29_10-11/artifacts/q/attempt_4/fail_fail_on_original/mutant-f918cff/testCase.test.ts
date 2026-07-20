import { Q } from "./q.js";

describe('Promise', () => {
    it('should reject with an error when an exception is thrown in the promise dispatch', () => {
        var promise = Q.Promise({
            "when": function (resolve, op, args) {
                throw new Error("Test error");
            }
        }, function fallback() {
            return this;
        }, function inspect() {
            return { state: "unknown" };
        });

        return promise.then(null, function (error) {
            expect(error).not.toBeUndefined();
        });
    });
});