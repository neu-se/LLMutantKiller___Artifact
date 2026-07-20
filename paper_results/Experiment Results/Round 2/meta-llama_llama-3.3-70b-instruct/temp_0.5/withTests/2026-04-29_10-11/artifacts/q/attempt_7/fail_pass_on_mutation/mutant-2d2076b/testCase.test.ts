import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', function () {
    it('should reject immediately if the timeout is not provided and the input promise is rejected', function () {
        var promise = Q.reject(new Error("haha!")).delay();
        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("haha!");
        });
    });
});