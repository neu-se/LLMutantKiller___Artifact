let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - immediate callback', function(done) {
        // Test with a function that calls callback immediately
        function immediateFunction(value, callback) {
            callback(null, value.toUpperCase());
        }

        const denodeified = q.denodeify(immediateFunction);
        
        denodeified('hello').then(result => {
            assert.strictEqual(result, 'HELLO');
            done();
        }).catch(done);
    });
});