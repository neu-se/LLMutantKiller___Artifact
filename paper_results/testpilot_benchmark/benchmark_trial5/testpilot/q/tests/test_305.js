let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - basic callback conversion', function(done) {
        // Create a simple Node.js style callback function
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value === 'error') {
                    callback(new Error('Test error'));
                } else {
                    callback(null, value + ' processed');
                }
            }, 10);
        }

        // Use q.denodeify to convert the Node.js style function to a promise-returning function
        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified('hello')
            .then(result => {
                assert.strictEqual(result, 'hello processed');
                done();
            })
            .catch(done);
    });
});