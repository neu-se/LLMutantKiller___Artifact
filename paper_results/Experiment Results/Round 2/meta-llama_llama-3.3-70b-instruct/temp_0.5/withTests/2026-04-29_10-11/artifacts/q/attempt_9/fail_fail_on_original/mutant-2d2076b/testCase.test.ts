import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', function () {
    it('should reject with a timeout error if the timeout is provided and the input promise is not rejected, and the timeout is exceeded', function () {
        var promise = Q.delay(10, "custom").then(function () {
            return Q.delay(100);
        });
        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toContain("custom");
            expect(error.code).toBe("ETIMEDOUT");
        });
    });
});