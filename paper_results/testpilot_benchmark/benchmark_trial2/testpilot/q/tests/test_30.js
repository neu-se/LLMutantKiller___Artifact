let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all with resolved promises', function(done) {
        let promise1 = q.resolve(10);
        let promise2 = q.resolve(20);
        let promise3 = q.resolve(30);
        
        q.Promise.all([promise1, promise2, promise3])
            .then(function(results) {
                assert.deepEqual(results, [10, 20, 30]);
                done();
            })
            .catch(done);
    });
    
    })