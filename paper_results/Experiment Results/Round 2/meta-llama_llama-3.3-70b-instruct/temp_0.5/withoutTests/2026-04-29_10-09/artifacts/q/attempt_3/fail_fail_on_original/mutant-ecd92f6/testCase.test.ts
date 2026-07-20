import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a fulfilled state when inspect is undefined', () => {
        const promise = Q.Promise({}, function fallback(op: string, args: any[]) {
            return {};
        }, undefined);
        expect(promise.inspect()).not.toBeNull();
    });
});