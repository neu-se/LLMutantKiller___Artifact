let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - method with no arguments', function(done) {
        let mockObject = {
            getMessage: function(callback) {
                setTimeout(() => {
                    callback(null, 'Hello World');
                }, 10);
            }
        };
        
        let promiseObject = q.makePromise(mockObject);
        
        promiseObject.post('getMessage', [])
            .then(function(result) {
                assert.strictEqual(result, 'Hello World');
                done();
            })
            .catch(done);
    });

    })