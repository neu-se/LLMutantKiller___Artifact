let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - method with arguments', function(done) {
        let testObject = {
            multiply: function(x, y) {
                return x * y;
            }
        };
        
        let promise = q.makePromise(testObject);
        let result = promise.dispatch('multiply', [5, 3]);
        
        result.then(function(value) {
            assert.strictEqual(value, 15);
            done();
        }).catch(done);
    });

    })