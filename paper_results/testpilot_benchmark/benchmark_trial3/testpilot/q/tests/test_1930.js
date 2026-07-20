let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should resolve with first promise if it fulfills immediately', function(done) {
        let promise1 = q.resolve('immediate result');
        let promise2 = q.delay(100).then(() => 'delayed result');
        
        q.any([promise1, promise2])
            .then(result => {
                assert.equal(result, 'immediate result');
                done();
            })
            .catch(done);
    });

    })