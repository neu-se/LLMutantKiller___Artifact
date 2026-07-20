import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.fcall', function () {
    it('should call a function with the correct arguments', function () {
        var func = function (a, b, c) {
            return a + b + c;
        };
        return Q.fcall(func, 1, 2, 3).then(function (result) {
            expect(result).toBe(6);
        });
    });

    it('should call a function with an empty argument list', function () {
        var func = function () {
            return 42;
        };
        return Q.fcall(func).then(function (result) {
            expect(result).toBe(42);
        });
    });

    it('should reject if the function throws an error', function () {
        var func = function () {
            throw new Error('Test error');
        };
        return Q.fcall(func).then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe('Test error');
        });
    });
});