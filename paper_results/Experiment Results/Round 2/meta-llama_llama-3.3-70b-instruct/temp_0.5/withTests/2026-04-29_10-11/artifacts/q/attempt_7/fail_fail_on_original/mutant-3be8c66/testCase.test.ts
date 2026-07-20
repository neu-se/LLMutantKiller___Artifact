import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.isFulfilled', function () {
    it('should return true for a fulfilled promise', function () {
        var promise = q(10);
        expect(promise.isFulfilled()).toBe(true);
    });
});