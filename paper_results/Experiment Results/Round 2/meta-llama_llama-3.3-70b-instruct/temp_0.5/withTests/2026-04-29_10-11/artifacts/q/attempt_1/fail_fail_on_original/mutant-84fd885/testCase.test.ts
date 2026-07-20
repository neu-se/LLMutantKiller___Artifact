import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nsend", function () {
    it("should call the method with the provided arguments", function () {
        var obj = {
            method: function (a, b, c) {
                return a + b + c;
            }
        };

        return Q.nsend(obj, "method", 1, 2, 3).then(function (result) {
            expect(result).toBe(6);
        });
    });

    it("should reject if the method does not exist", function () {
        var obj = {};

        return Q.nsend(obj, "method", 1, 2, 3).then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toMatch(/Promise does not support operation: method/);
        });
    });

    it("should reject if the method throws an error", function () {
        var obj = {
            method: function () {
                throw new Error("Test error");
            }
        };

        return Q.nsend(obj, "method", 1, 2, 3).then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Test error");
        });
    });
});