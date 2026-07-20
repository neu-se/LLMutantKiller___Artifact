let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - partial argument binding', function(done) {
        function asyncMultiply(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a * b * c);
            }, 10);
        }
        
        let promiseMultiply = q.makePromise(asyncMultiply);
        let partiallyBound = promiseMultiply.fbind(2, 3);
        
        partiallyBound(4).then(result => {
            assert.equal(result, 24);
            done();
        }).catch(done);
    });
    
    })