import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var obj = {
            method: function (a: any, b: any, c: any, callback: any) {
                callback(null, a + b + c);
            }
        };

        // Test that the Q.nsend function is defined and callable.
        if (Q.nsend && typeof Q.nsend === 'function') {
            var promise = Q.nsend(obj, "method", 1, 2, 3);
            return promise.then(function (value: any) {
                expect(value).toBe(6);
            }).catch(function (error: any) {
                if (error instanceof TypeError && error.message.includes("Q.nsend is not a function")) {
                    expect(true).toBe(false);
                } else {
                    throw error;
                }
            });
        } else {
            throw new Error("Q.nsend is not defined or not a function");
        }
    });
});