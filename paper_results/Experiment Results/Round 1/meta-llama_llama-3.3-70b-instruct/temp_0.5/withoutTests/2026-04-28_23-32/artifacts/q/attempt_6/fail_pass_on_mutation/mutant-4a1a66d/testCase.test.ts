import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle async function generator correctly', async () => {
        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            throw new Error('Test error');
        });

        const result = asyncFunction();
        await expect(result).rejects.toThrowError('Test error');
    });
});