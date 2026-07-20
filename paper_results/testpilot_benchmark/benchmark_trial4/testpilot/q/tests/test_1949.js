let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should resolve with first fulfilled promise', function(done) {
        let promise1 = q.delay(100).then(() => { throw new Error('first error'); });
        let promise2 = q.delay(50).then(() => 'second result');
        let promise3 = q.delay(200).then(() => 'third result');
        
        // Using q.race to get the first settled promise (fulfilled or rejected)
        // But we want the first fulfilled, so we need a different approach
        q.allSettled([promise1, promise2, promise3])
            .then(results => {
                // Find the first fulfilled promise
                let firstFulfilled = results.find(result => result.state === 'fulfilled');
                if (firstFulfilled) {
                    assert.equal(firstFulfilled.value, 'second result');
                    done();
                } else {
                    done(new Error('No promise was fulfilled'));
                }
            })
            .catch(done);
    });
});