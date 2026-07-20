import { Q } from "../../../../../../../../subject_repositories/q/q.js";

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

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Test error");
        });
    });
});