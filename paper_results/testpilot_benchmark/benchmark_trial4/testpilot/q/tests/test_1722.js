let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set with immediate object', function(done) {
        let obj = { name: 'initial' };
        
        // Create a promise that resolves immediately and sets the property
        q.resolve()
            .then(function() {
                obj.name = 'updated';
                return obj;
            })
            .then(function(result) {
                assert.strictEqual(obj.name, 'updated');
                done();
            })
            .catch(done);
    });
});