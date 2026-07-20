import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise with a pending state when inspect is called', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected).toHaveProperty('state');
        expect(typeof inspected.state).toBe('string');
    });
});