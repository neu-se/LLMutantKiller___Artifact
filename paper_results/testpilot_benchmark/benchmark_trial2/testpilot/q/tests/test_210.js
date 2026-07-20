let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - basic functionality', function(done) {
        // Create a simple async function that takes arguments
        function asyncAdd(a, b, callback) {
            setTimeout(() => {
                callback(null, a + b);
            }, 10);
        }
        
        // Convert to promise using q.denodeify and bind arguments using q.fbind
        let promiseAdd = q.denodeify(asyncAdd);
        let boundAdd = q.fbind(promiseAdd, 5, 3);
        
        boundAdd().then(result => {
            assert.equal(result, 8);
            done();
        }).catch(done);
    });
});