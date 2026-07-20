let assert = require('assert');

// Simple implementation of q.post functionality for testing
function qPost(object, methodName, args) {
    return new Promise((resolve, reject) => {
        try {
            const result = object[methodName].apply(object, args);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

describe('test q', function() {
    it('test q.post with method that modifies object state', function(done) {
        let testObject = {
            value: 0,
            increment: function(amount) {
                this.value += amount;
                return this.value;
            }
        };
        
        let promise = qPost(testObject, 'increment', [10]);
        
        promise.then(function(result) {
            assert.equal(result, 10);
            assert.equal(testObject.value, 10);
            done();
        }).catch(done);
    });
});