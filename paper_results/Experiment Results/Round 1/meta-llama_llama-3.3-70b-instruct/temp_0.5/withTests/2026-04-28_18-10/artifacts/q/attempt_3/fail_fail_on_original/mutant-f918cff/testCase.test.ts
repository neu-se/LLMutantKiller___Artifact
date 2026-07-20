import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', function () {
    it('should reject the promise when an exception is thrown in the promise dispatch', function () {
        var promise = Q(function (resolve, reject) {
            try {
                throw new Error("Test error");
            } catch (exception) {
                reject(exception);
            }
        });

        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Test error");
        });
    });
});