let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - basic callback conversion', function(done) {
        // Create a simple Node.js style callback function
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value > 0) {
                    callback(null, value * 2);
                } else {
                    callback(new Error('Value must be positive'));
                }
            }, 10);
        }

        // Create a promise and use denodeify
        const promise = q.makePromise(() => {});
        const denodeified = promise.denodeify(nodeStyleFunction);
        
        denodeified(5).then(result => {
            assert.strictEqual(result, 10);
            done();
        }).catch(done);
    });

    })