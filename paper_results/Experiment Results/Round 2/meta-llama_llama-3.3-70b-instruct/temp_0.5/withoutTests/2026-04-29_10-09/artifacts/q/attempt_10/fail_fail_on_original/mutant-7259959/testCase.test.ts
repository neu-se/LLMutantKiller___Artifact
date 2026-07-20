describe('Q.async', () => {
    it('should throw an error when the generator is not properly handled', async () => {
        const Q = require('../../../../q.js');
        const asyncFunction = Q.async(function* () {
            yield Q.resolve();
            throw new Error("Test error");
        });
        await expect(asyncFunction()).rejects.toThrow("Test error");
    });
});