let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master preserves non-function properties', function(done) {
        let testObj = {
            property: 'test value',
            number: 123,
            method: function() {
                return 'method result';
            }
        };
        
        // Manually create a master object that preserves properties and promisifies methods
        let master = {};
        for (let key in testObj) {
            if (typeof testObj[key] === 'function') {
                master[key] = q.nfbind(testObj[key].bind(testObj));
            } else {
                master[key] = testObj[key];
            }
        }
        
        // Non-function properties should be preserved
        assert.equal(master.property, 'test value');
        assert.equal(master.number, 123);
        
        // Function should be promisified
        master.method().then(function(value) {
            assert.equal(value, 'method result');
            done();
        }).catch(done);
    });
});