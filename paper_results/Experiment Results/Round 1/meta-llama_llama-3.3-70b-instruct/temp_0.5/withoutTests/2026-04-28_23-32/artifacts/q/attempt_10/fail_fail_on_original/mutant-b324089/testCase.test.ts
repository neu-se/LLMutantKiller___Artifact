const fs = require('fs');
const qCode = fs.readFileSync('./q.js', 'utf8');
const Q = eval(qCode);

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = Q('fulfilled');
        const result = Q.nearer(promise);
        expect(result).toBe('fulfilled');
    });
});