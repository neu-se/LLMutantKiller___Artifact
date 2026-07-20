let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle primitive values correctly', function(done) {
        let tests = [
            { input: 'string', expected: 'string' },
            { input: 123, expected: 123 },
            { input: true, expected: true },
            { input: false, expected: false }
        ];
        
        let promises = tests.map(test => {
            return q(test.input).then(value => {
                assert.strictEqual(value, test.expected, `Should handle ${typeof test.input} correctly`);
            });
        });
        
        Promise.all(promises).then(() => done()).catch(done);
    });
});