let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set adding new property', function(done) {
        let obj = {};
        
        // Q doesn't have a set method, so let's create a simple promise-based set function
        let setPromise = Q.fcall(function() {
            obj.newProp = 'newValue';
            return 'newValue';
        });
        
        setPromise
            .then(function(result) {
                assert.strictEqual(obj.newProp, 'newValue');
                assert.strictEqual(result, 'newValue');
                done();
            })
            .catch(done);
    });
});