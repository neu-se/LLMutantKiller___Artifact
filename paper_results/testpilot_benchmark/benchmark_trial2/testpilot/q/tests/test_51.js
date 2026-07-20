let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.all with resolved promises', function(done) {
        let promise1 = q.resolve(10);
        let promise2 = q.resolve(20);
        
        q.all([promise1, promise2]).then(function(results) {
            let result = results[0] + results[1];
            assert.equal(result, 30);
            done();
        }).catch(done);
    });
    
})