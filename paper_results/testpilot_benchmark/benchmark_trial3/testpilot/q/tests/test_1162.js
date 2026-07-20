let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - basic callback conversion', function(done) {
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

        // Create a promise and use denodeify
        const promise = q.makePromise(function(resolve, reject) {
            resolve('test');
        });

        const denodified = promise.denodeify(nodeStyleFunction);
        
        denodified('hello')
            .then(result => {
                assert.strictEqual(result, 'hello processed');
                done();
            })
            .catch(done);
    });

    })