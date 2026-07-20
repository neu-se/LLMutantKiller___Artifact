import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when promise function does not call the resolver', () => {
        const originalPromise = Q.promise;
        Q.promise = function(resolver) {};
        expect(() => Q.promise(function(resolve, reject, notify) {})).not.toThrow();
        Q.promise = originalPromise;
        expect(() => Q.promise(function(resolve, reject, notify) {})).toThrowError('resolver must be a function.');
    });
});