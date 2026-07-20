let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle mix of values and promises', function(done) {
        let promise1 = q.delay(100).then(() => { throw new Error('delayed error'); });
        let immediateValue = 'immediate value';
        let promise2 = q.delay(200).then(() => 'delayed result');
        
        // Convert immediate value to resolved promise and use q.race
        let promises = [promise1, q.resolve(immediateValue), promise2];
        
        q.race(promises)
            .then(result => {
                assert.equal(result, 'immediate value');
                done();
            })
            .catch(done);
    });
});