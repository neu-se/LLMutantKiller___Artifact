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
        
        // Convert to promise and bind arguments
        let promiseAdd = q.makePromise(asyncAdd);
        let boundAdd = promiseAdd.fbind(5, 3);
        
        boundAdd().then(result => {
            assert.equal(result, 8);
            done();
        }).catch(done);
    });
    
    })