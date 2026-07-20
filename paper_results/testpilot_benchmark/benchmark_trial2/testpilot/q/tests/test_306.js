let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - error handling', function(done) {
        // Create a Node.js style function that returns an error
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value > 0) {
                    callback(null, value * 2);
                } else {
                    callback(new Error('Value must be positive'));
                }
            }, 10);
        }

        const promise = q.makePromise(() => {});
        const denodeified = promise.denodeify(nodeStyleFunction);
        
        denodeified(-1).then(() => {
            done(new Error('Should have rejected'));
        }).catch(error => {
            assert.strictEqual(error.message, 'Value must be positive');
            done();
        });
    });

    })