import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should test the behavior of the mutated file', async () => {
        const deferred = Q.defer();
        const promise = deferred.promise.then(() => {
            throw new Error('Test error');
        });
        deferred.resolve();
        await expect(promise).rejects.toThrow('Test error');
    });
});