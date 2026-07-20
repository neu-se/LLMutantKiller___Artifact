import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var obj = {
            method: function (a, b, c, callback) {
                callback(null, a + b + c);
            }
        };

        // Test that the Promise.prototype.ninvoke function is defined and callable.
        var promise = Q.ninvoke(obj, "method", 1, 2, 3);

        // Test that the promise is resolved with the correct value.
        return promise.then(function (value) {
            expect(value).toBe(6);
        });
    });
});