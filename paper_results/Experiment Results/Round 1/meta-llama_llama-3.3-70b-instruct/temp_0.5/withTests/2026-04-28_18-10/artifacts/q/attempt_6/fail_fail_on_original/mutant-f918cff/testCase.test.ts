import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', function () {
    it('should reject the promise when an exception is thrown in the promise dispatch', function () {
        var promise = Q(true);
        return promise.then(function () {
            throw new Error("Test error");
        }).catch(function (error) {
            expect(error.message).toBe("Test error");
        });
    });
});