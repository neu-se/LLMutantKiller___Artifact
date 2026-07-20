let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.any - resolves with first fulfilled promise', function(done) {
        let promise1 = q.delay(100).then(() => { throw new Error('first error'); });
        let promise2 = q.delay(50).then(() => 'second success');
        let promise3 = q.delay(200).then(() => 'third success');
        
        q.any([promise1, promise2, promise3]).then(function(result) {
            assert.equal(result, 'second success');
            done();
        }).catch(done);
    });
    
    })