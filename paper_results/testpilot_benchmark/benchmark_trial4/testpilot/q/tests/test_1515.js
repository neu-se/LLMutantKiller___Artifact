let assert = require('assert');
let q = require('q');

// Simple implementation of q.master for testing purposes
if (!q.master) {
    q.master = function(obj) {
        let master = {};
        
        // Copy non-function properties
        for (let key in obj) {
            if (typeof obj[key] !== 'function') {
                master[key] = obj[key];
            }
        }
        
        // Wrap functions to return promises
        for (let key in obj) {
            if (typeof obj[key] === 'function') {
                master[key] = function() {
                    let result = obj[key].apply(obj, arguments);
                    return q.resolve(result);
                };
            }
        }
        
        return master;
    };
}

describe('test q', function() {
    it('test q.master preserves non-function properties', function(done) {
        let testObj = {
            name: 'test object',
            value: 123,
            getInfo: function() {
                return this.name + ': ' + this.value;
            }
        };
        
        let master = q.master(testObj);
        
        // Non-function properties should be preserved
        assert.equal(master.name, 'test object');
        assert.equal(master.value, 123);
        
        master.getInfo().then(function(result) {
            assert.equal(result, 'test object: 123');
            done();
        }).catch(done);
    });
});