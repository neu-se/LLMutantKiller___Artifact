import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle async function generator correctly', async () => {
        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            return Q.resolve(2);
        });

        const result = await asyncFunction();
        expect(result).toBe(2);
        const asyncFunction2 = Q.async(function* () {
            yield Promise.resolve(1);
            throw new Error('Test error');
        });
        await expect(asyncFunction2()).rejects.toThrowError('Test error');
        const asyncFunction3 = Q.async(function* () {
            yield Promise.resolve(1);
            try {
                throw new Error('StopIteration');
            } catch (e) {
                if (e.message === 'StopIteration') {
                    throw e;
                }
            }
        });

        await expect(asyncFunction3()).rejects.toThrowError('StopIteration');
    });
});