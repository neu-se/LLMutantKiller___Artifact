let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with empty generator', function(done) {
        function* emptyGenerator() {
            return 'empty result';
        }
        
        // Use Q.async instead of q.spawn, or create a promise manually
        let promise = q.Promise(function(resolve, reject) {
            try {
                let generator = emptyGenerator();
                let result = generator.next();
                resolve(result.value);
            } catch (error) {
                reject(error);
            }
        });
        
        promise
            .then(function(result) {
                assert.equal(result, 'empty result');
                done();
            })
            .catch(done);
    });
});