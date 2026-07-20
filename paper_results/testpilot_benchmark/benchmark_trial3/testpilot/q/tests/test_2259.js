let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - with base arguments', function(done) {
        // Create a function that takes multiple arguments
        function multiArgFunction(prefix, suffix, value, callback) {
            setTimeout(() => {
                callback(null, prefix + value + suffix);
            }, 10);
        }
        
        // Denodeify with base arguments
        const promisified = q.denodeify(multiArgFunction, 'Hello ', '!');
        
        // Test that base arguments are applied
        promisified('World')
            .then(result => {
                assert.strictEqual(result, 'Hello World!');
                done();
            })
            .catch(done);
    });
});