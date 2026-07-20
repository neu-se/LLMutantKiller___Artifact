describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const asyncFunction = Q.async(function* () {
            try {
                yield Q.resolve();
                if (result.done) {
                    throw new Error('Test error');
                }
            } catch (e) {
                throw e;
            }
        });
        const result = asyncFunction();
        expect(result).not.toThrow();
    });
});