import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", function () {
    it("should call a function with the given arguments", function () {
        var called = false;
        var func = function (a: any, b: any, c: any) {
            called = true;
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        };

        return Q.fcall(func, 1, 2, 3).then(function () {
            expect(called).toBe(true);
        });
    });

    it("should reject if the function throws an error", function () {
        var func = function () {
            throw new Error("Test error");
        };

        return Q.fcall(func).then(function () {
            expect(true).toBe(false);
        }, function (error: any) {
            expect(error.message).toBe("Test error");
        });
    });

    it("should reject if the function returns a rejected promise", function () {
        var func = function () {
            return Q.reject(new Error("Test error"));
        };

        return Q.fcall(func).then(function () {
            expect(true).toBe(false);
        }, function (error: any) {
            expect(error.message).toBe("Test error");
        });
    });
});