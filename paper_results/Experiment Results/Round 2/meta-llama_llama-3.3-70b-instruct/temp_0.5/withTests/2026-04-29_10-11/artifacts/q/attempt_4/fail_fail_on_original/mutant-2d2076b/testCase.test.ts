import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', function () {
    it('should delay fulfillment', function () {
        var promise = Q(10).delay(50);
        return promise.then(function (value) {
            expect(value).toBe(10);
        });
    });

    it('should reject immediately if the input promise is rejected', function () {
        var promise = Q.reject(new Error("haha!")).delay(50);
        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("haha!");
        });
    });
});