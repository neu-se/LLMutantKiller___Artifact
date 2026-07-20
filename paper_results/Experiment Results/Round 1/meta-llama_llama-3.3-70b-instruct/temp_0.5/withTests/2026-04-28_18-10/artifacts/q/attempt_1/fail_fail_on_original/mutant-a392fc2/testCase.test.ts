import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise.prototype.finally', function () {
    it('should call the callback and return nothing', function () {
        var called = false;
        return Q("foo")
            .finally(function () {
                called = true;
            })
            .then(function () {
                expect(called).toBe(true);
            });
    });

    it('should fulfill with the original value', function () {
        return Q("foo")
            .finally(function () {
                return "bar";
            })
            .then(function (result) {
                expect(result).toBe("foo");
            });
    });

    it('should reject with the original reason', function () {
        var error = new Error("Test error");
        return Q.reject(error)
            .finally(function () {
                return "bar";
            })
            .then(function () {
                expect(true).toBe(false);
            }, function (reason) {
                expect(reason).toBe(error);
            });
    });

    it('should throw an error if the callback is not a function', function () {
        expect(function () {
            Q().finally("not a function");
        }).toThrowError("Q can't apply finally callback");
    });
});