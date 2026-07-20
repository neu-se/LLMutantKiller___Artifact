let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - error case', function(done) {
        // Mock a Node.js-style function that fails
        function mockAsyncFunction(data, callback) {
            setTimeout(() => {
                callback(new Error('Something went wrong'));
            }, 10);
        }

        let promise = q.makePromise(function(resolve, reject) {
            resolve(mockAsyncFunction);
        });

        let denodeified = promise.denodeify();
        
        denodeified('test data')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Something went wrong');
                done();
            });
    });

    })