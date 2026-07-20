let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with empty generator', function(done) {
        function* emptyGenerator() {
            return 'empty result';
        }
        
        // Use Q.async to handle generator functions
        let asyncFn = q.async(emptyGenerator);
        
        asyncFn()
            .then(function(result) {
                assert.equal(result, 'empty result');
                done();
            })
            .catch(done);
    });
});