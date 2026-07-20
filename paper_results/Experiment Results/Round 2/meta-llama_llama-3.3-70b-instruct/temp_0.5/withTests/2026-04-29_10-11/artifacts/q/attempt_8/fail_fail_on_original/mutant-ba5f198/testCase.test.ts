const Q = require('../../../../q');

describe('Q', () => {
    it('should throw an error when nextTick is called with a non-function argument', () => {
        expect(() => Q.nextTick('not a function')).toThrow();
    });
});