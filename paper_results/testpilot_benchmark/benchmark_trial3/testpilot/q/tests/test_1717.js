let assert = require('assert');

// Simple implementation of q.set that returns a promise
let q = {
    set: function(obj, key, value) {
        return new Promise(function(resolve) {
            obj[key] = value;
            resolve(obj);
        });
    }
};

describe('test q', function() {
    it('test q.set with immediate object', function(done) {
        let obj = { name: 'initial' };
        
        q.set(obj, 'name', 'updated')
            .then(function(result) {
                assert.strictEqual(obj.name, 'updated');
                done();
            })
            .catch(done);
    });
});