let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - method with no arguments', function(done) {
        let mockObject = {
            getValue: function(callback) {
                setTimeout(() => {
                    callback(null, 'test value');
                }, 10);
            }
        };
        
        let promiseObject = q.makePromise(mockObject);
        
        promiseObject.post('getValue', [])
            .then(result => {
                assert.strictEqual(result, 'test value');
                done();
            })
            .catch(done);
    });
    
    })