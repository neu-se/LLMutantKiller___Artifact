let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with no additional arguments', function(done) {
        function simpleFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        const boundFunction = q.nbind(simpleFunction, null);
        
        boundFunction()
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});