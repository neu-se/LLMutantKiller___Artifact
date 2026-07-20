import { Q } from './q';

describe('Q', () => {
    it('should return a promise with a state property when inspect is called', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(Object.keys(inspected)).toHaveLength(1);
        expect(inspected).toHaveProperty('state', 'pending');
    });
});