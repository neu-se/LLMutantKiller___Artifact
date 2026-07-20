import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', function () {
    it('should reject with a timeout error if the timeout is provided and the input promise is not rejected', function () {
        var promise = Q(10).delay(10);
        return promise.then(function () {
            expect(true).toBe(true);
        }, function (error) {
            expect(error.code).toBe("ETIMEDOUT");
        });
    });
});