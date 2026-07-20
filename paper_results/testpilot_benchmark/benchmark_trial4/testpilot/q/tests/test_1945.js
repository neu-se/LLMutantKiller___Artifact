let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle mix of values and promises', function(done) {
        let promise1 = q.delay(100).then(() => { throw new Error('delayed error'); });
        let immediateValue = 'immediate value';
        let promise2 = q.delay(200).then(() => 'delayed result');
        
        q.any([promise1, immediateValue, promise2])
            .then(result => {
                assert.equal(result, 'immediate value');
                done();
            })
            .catch(done);
    });
});