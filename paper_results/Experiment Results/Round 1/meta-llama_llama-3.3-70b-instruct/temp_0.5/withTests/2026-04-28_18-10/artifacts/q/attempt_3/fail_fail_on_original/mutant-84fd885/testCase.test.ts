import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nsend", () => {
    it("should pass arguments to the post method", () => {
        var obj = {
            method: function(a: any, b: any, c: any, callback: any) {
                callback(null, a + b + c);
            }
        };

        return Q.nsend(obj, "method", 1, 2, 3)
            .then(function(sum: any) {
                expect(sum).toBe(6);
            });
    });

    it("should reject with an error if the method does not exist", () => {
        var obj = {};

        return Q.nsend(obj, "method", 1, 2, 3)
            .then(function() {
                expect(true).toBe(false);
            }, function(error: any) {
                expect(error.message).toBe("Q can't post to non-function 'method'");
            });
    });

    it("should pass arguments to the post method with correct args", () => {
        var obj = {
            method: function(a: any, b: any, c: any, callback: any) {
                callback(null, a + b + c);
            }
        };

        return Q.nsend(obj, "method", 1, 2, 3)
            .then(function(sum: any) {
                expect(sum).toBe(6);
            });
    });
});