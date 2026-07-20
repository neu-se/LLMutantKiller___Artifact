let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should reject when all promises are rejected', function(done) {
        let promise1 = q.reject(new Error('first error'));
        let promise2 = q.reject(new Error('second error'));
        let promise3 = q.reject(new Error('third error'));
        
        q.any([promise1, promise2, promise3])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert(err.message.includes("Q can't get fulfillment value from any promise"));
                assert(err.message.includes("third error"));
                done();
            });
    });
});