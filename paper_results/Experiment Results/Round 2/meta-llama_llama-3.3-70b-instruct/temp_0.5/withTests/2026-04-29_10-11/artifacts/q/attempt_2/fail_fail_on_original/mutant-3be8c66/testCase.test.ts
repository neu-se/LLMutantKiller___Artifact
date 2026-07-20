import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.isFulfilled', function () {
    it('should return this.inspect().state === "fulfilled"', function () {
        var promise = Q(10);
        expect(promise.isFulfilled()).toBe(true);
    });
});