import { Q } from "./q.js";

describe('Promise', () => {
    it('should reject with an error when an exception is thrown in the promise dispatch', () => {
        var deferred = Q.defer();
        var promise = deferred.promise.then(function () {
            throw new Error("Test error");
        });

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Test error");
        });
    });
});