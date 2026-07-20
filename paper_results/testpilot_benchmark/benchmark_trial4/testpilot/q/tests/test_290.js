let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with delayed promises', function(done) {
        let promise1 = q.delay(10).then(() => 'first');
        let promise2 = q.delay(20).then(() => 'second');
        
        q.join(promise1, promise2, function(val1, val2) {
            return [val1, val2];
        }).then(function(result) {
            assert.deepEqual(result, ['first', 'second']);
            done();
        }).catch(done);
    });
    
    })