describe('Q', () => {
    it('should test the behavior of the mutated file', async () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const generator = function* () {
            try {
                yield Q.resolve();
                if (result.done) {
                    throw new Error('Test error');
                }
            } catch (e) {
                throw e;
            }
        };
        const asyncFunction = Q.async(generator);
        const result = asyncFunction();
        await expect(result).resolves.not.toThrow();
    });
});