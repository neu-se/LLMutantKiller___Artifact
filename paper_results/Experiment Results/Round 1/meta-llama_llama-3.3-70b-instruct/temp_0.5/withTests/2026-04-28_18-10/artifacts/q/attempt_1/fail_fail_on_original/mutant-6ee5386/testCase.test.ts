import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('defer and when', () => {
    it('observers called even after throw', () => {
        var threw = true;
        var deferred = Q.defer();
        Q.when(deferred.promise, function () {
            threw = true;
            throw new Error("In your face.");
        });
        var promise = Q.when(deferred.promise, function (value) {
            return value;
        }, function () {
            return "error";
        });
        deferred.resolve(10);
        return promise.then(function (value) {
            expect(threw).toBe(true);
            expect(value).toBe(10);
        });
    });
});