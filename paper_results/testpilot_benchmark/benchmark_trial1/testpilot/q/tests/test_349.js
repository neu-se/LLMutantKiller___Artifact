let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke with error callback', function(done) {
        const mockObject = {
            failingMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Something went wrong'));
                }, 10);
            }
        };

        const promise = q.makePromise(mockObject);
        
        promise.ninvoke('failingMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Something went wrong');
                done();
            });
    });

    })