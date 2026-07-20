import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var obj = {
            method: function (a: any, b: any, c: any, callback: any) {
                callback(null, a + b + c);
            }
        };

        // Test that the Q.nsend function is defined and callable.
        expect(Q.nsend).toBeDefined();

        // Test that the promise is resolved with the correct value.
        var promise = Q.nsend(obj, "method", 1, 2, 3);
        return promise.then(function (value: any) {
            expect(value).toBe(6);
        });
    });
});