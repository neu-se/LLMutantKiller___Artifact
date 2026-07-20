let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all with mixed values and promises', function(done) {
        let promise1 = q.resolve('hello');
        let value2 = 'world';
        let promise3 = q.resolve(42);
        
        q.Promise.all([promise1, value2, promise3])
            .then(function(results) {
                assert.deepEqual(results, ['hello', 'world', 42]);
                done();
            })
            .catch(done);
    });
    
    })