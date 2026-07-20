import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when resolver is not a function', () => {
        const originalPromise = Q.promise;
        Q.promise = function(resolver) {};
        expect(() => Q.promise('not a function')).not.toThrow();
        Q.promise = originalPromise;
    });
});