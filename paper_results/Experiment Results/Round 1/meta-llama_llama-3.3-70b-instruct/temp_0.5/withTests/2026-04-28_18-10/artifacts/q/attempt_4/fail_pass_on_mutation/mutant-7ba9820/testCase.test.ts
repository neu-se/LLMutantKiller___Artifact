import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var obj = {
            method: function (a: any, b: any, c: any, callback: any) {
                callback(null, a + b + c);
            }
        };

        // Test that the Q.ninvoke function is defined and callable.
        var promise = Q.ninvoke(obj, "method", 1, 2, 3);

        // Test that the promise is resolved with the correct value.
        return promise.then(function (value: any) {
            expect(value).toBe(6);
        }).then(null, function (error: any) {
            throw error;
        });
    });
});