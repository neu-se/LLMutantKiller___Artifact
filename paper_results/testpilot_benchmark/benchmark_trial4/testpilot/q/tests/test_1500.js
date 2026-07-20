let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

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