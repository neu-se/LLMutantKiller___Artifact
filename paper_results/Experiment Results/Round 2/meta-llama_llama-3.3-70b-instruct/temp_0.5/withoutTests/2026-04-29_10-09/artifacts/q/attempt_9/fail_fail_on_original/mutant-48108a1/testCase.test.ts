import { Q } from '../../../q.js';

describe('Q', () => {
    it('should return an object with a state property when inspect is called on a pending promise', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected).toHaveProperty('state', 'pending');
    });
});