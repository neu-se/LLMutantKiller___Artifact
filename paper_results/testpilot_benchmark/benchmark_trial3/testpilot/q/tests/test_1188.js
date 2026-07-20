let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind - no additional arguments', function(done) {
        function mockNodeFunction(callback) {
            setTimeout(() => {
                callback(null, 'no args');
            }, 10);
        }
        
        const boundFunc = q.nbind(mockNodeFunction, null);
        
        boundFunc().then(result => {
            assert.strictEqual(result, 'no args');
            done();
        }).catch(done);
    });
});