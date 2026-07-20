let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - no pre-bound arguments', function(done) {
        let testFunction = function(x, y) {
            return x * y;
        };
        
        let promise = q.resolve(testFunction);
        let boundFunction = promise.fbind(); // No pre-bound arguments
        
        boundFunction(4, 5).then(function(result) {
            assert.equal(result, 20); // 4 * 5 = 20
            done();
        }).catch(done);
    });

    })