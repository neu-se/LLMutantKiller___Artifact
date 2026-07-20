describe('Q.async', () => {
    it('should resolve with the correct value', () => {
        const Q = require('../q').Q;
        const asyncFunction = Q.async(function* () {
            yield Q.resolve(1);
            if (result && result.done) {
                throw new Error('Result is done');
            }
            return 2;
        });

        return expect(asyncFunction()).rejects.toThrow('Result is done');
    });
});