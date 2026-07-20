let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - success case', function(done) {
        // Mock a Node.js-style function that succeeds
        function mockAsyncFunction(data, callback) {
            setTimeout(() => {
                callback(null, `processed: ${data}`);
            }, 10);
        }

        // Create a promise and use denodeify on it
        let promise = q.makePromise(function(resolve, reject) {
            resolve(mockAsyncFunction);
        });

        let denodeified = promise.denodeify();
        
        denodeified('test data')
            .then(result => {
                assert.strictEqual(result, 'processed: test data');
                done();
            })
            .catch(done);
    });

    })