import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', function () {
    it('should return false for isFulfilled when the promise is fulfilled', function () {
        var promise = Q(10);
        expect(promise.isFulfilled()).toBe(true);
    });
});