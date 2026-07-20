let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - error handling', function(done) {
        // Create a Node.js style function that can error
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value === 'error') {
                    callback(new Error('Test error'));
                } else {
                    callback(null, value);
                }
            }, 10);
        }

        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified('error')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            });
    });
});