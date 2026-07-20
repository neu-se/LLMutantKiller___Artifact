let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with callback that throws error', function(done) {
        function throwingCallback(value) {
            if (value < 0) {
                throw new Error('Negative value not allowed');
            }
            return value;
        }
        
        const promisedCallback = q.promised(throwingCallback);
        
        const result = promisedCallback(q.resolve(-5));
        
        result.then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'Negative value not allowed');
            done();
        });
    });
});