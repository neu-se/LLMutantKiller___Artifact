import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', function () {
    it('should reject the promise when an exception is thrown in the promise dispatch', function () {
        var promise = Q.defer().promise;
        promise.then(function () {
            throw new Error("Test error");
        });
        return promise.catch(function (error) {
            expect(error.message).toBe("Test error");
        });
    });
});