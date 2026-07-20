import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nsend", function () {
    it.skip("should call the method with the provided arguments", function () {
        var obj = {
            method: function (a: number, b: number, c: number) {
                return a + b + c;
            }
        };

        return Q.nsend(obj, "method", 1, 2, 3).then(function (result: number) {
            expect(result).toBe(6);
        });
    });

    it.skip("should reject if the method does not exist", function () {
        var obj = {};

        return Q.nsend(obj, "method", 1, 2, 3).then(function () {
            expect(true).toBe(false);
        }, function (error: any) {
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
        }, function (error: any) {
            expect(error.message).toBe("Test error");
        });
    });
});