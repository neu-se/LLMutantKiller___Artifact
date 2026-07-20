let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.any - rejects when all promises reject', function(done) {
        let promise1 = q.delay(50).then(() => { throw new Error('error1'); });
        let promise2 = q.delay(100).then(() => { throw new Error('error2'); });
        let promise3 = q.delay(150).then(() => { throw new Error('error3'); });
        
        q.any([promise1, promise2, promise3])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert(error instanceof Error);
                done();
            });
    });
    
    })