import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', function () {
    it('should reject the promise when an exception is thrown in the promise dispatch', function () {
        var promise = Q.Promise({
            "when": function (resolve, op, args) {
                try {
                    throw new Error("Test error");
                } catch (exception) {
                    // do nothing
                }
            }
        }, function fallback() {
            return this;
        }, function inspect() {
            return { state: "unknown" };
        });

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error).toBeUndefined();
        });
    });
});