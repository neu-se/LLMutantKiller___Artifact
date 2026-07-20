import { Q } from '../q';

describe('Q', () => {
    it('should throw an error when inspect is called on a pending promise in the mutated code', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(Object.keys(promise.inspect())).not.toHaveLength(0);
    });
});