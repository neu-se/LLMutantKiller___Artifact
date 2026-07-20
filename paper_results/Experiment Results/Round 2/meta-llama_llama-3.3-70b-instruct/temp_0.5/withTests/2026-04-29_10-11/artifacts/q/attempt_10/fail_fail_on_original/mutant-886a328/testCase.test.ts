const Q = require('./q.js');

describe('Q', () => {
    it('should throw an error when Q.noConflict is called in a non-browser environment', () => {
        if (typeof window === 'undefined') {
            expect(() => Q.noConflict()).toThrowError("Q.noConflict only works when Q is used as a global");
        } else {
            expect(() => Q.noConflict()).not.toThrowError("Q.noConflict only works when Q is used as a global");
        }
    });
});