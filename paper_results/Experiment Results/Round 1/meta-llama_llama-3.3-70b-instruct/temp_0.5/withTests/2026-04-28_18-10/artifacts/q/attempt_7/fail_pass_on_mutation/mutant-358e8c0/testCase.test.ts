import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise when given a value', () => {
        const promise = q(5);
        const snapshot = promise.inspect();
        expect(snapshot.state).toBe('fulfilled');
        expect(snapshot.value).toBe(5);
    });

    it('should return a promise when given a rejected promise', () => {
        const error = new Error('Test error');
        const promise = q(q.reject(error));
        const snapshot = promise.inspect();
        expect(snapshot.state).toBe('rejected');
        expect(snapshot.reason).toBe(error);
    });

    it('should return a promise when given a pending promise', () => {
        const deferred = q.defer();
        const promise = q(deferred.promise);
        const snapshot = promise.inspect();
        expect(snapshot.state).toBe('pending');
        deferred.resolve(5);
    });
});