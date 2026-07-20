let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with multiple return values', function(done) {
        function nodeStyleFunction(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        const promisifiedFunction = q.nbind(nodeStyleFunction);
        
        promisifiedFunction()
            .then(result => {
                // q.nbind should return only the first result value
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});