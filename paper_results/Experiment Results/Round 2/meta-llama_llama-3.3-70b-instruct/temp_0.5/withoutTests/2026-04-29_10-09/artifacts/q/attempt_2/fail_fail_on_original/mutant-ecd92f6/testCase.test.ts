import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a fulfilled state when inspect is undefined', () => {
        const promise = Q.Promise({}, function(op, args) {
            return {};
        }, undefined);
        expect(promise.inspect()).not.toBeNull();
    });
});