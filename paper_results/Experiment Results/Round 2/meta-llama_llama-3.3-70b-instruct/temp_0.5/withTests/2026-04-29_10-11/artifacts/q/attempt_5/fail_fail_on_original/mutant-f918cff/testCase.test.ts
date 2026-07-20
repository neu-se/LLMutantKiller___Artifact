import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject with an error when an exception is thrown in the promise dispatch', () => {
        var promise = Q.Promise({
            "when": function (resolve, op, args) {
                resolve("Test error");
            }
        }, function fallback() {
            return this;
        }, function inspect() {
            return { state: "unknown" };
        });

        return promise.then(function (value) {
            expect(value).toBe("Test error");
        }, function (error) {
            expect(true).toBe(false);
        });
    });
});