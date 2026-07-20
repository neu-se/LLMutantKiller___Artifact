import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.nsend", () => {
    it("should pass arguments to the post method", () => {
        var obj = {
            method: function(a, b, c, callback) {
                callback(null, a + b + c);
            }
        };

        return Q.nsend(obj, "method", 1, 2, 3)
            .then(function(sum) {
                expect(sum).toBe(6);
            });
    });

    it("should reject with an error if the method does not exist", () => {
        var obj = {};

        return Q.nsend(obj, "method", 1, 2, 3)
            .then(function() {
                expect(true).toBe(false);
            }, function(error) {
                expect(error.message).toBe("Q can't post to non-function 'method'");
            });
    });
});