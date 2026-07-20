import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.isFulfilled', function () {
    it('should return true for a fulfilled promise', function () {
        var promise = Q(10);
        expect(promise.isFulfilled()).toBe(true);
    });
    it('should return false for the mutated code', function () {
        var promise = Q(10);
        expect(promise.isFulfilled()).not.toBe(false);
    });
});