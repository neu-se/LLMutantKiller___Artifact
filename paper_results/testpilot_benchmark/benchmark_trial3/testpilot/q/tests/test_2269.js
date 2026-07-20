let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with error handling', function(done) {
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value > 0) {
                    callback(null, value * 2);
                } else {
                    callback(new Error('Value must be positive'));
                }
            }, 10);
        }
        
        const promisifiedFunction = q.nbind(nodeStyleFunction);
        
        // Test error case
        promisifiedFunction(-1)
            .then(() => {
                done(new Error('Should have thrown an error'));
            })
            .catch(err => {
                assert.equal(err.message, 'Value must be positive');
                done();
            });
    });
    
    })