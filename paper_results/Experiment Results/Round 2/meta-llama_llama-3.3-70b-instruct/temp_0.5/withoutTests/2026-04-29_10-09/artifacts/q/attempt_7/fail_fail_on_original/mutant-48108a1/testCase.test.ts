import { Q } from '../../../q';

describe('Q', () => {
    it('should return an object with a state property when inspect is called on a pending promise', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(typeof inspected).toBe('object');
        expect(Object.keys(inspected)).toHaveLength(1);
        expect(inspected).toHaveProperty('state', 'pending');
    });
});