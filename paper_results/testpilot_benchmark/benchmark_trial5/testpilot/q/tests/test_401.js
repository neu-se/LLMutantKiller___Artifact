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
        
        let master = q.master(testObj);
        
        // Non-function properties should be preserved
        assert.equal(master.property, 'test value');
        assert.equal(master.number, 123);
        
        // Function should be promisified
        master.method().then(function(value) {
            assert.equal(value, 'method result');
            done();
        }).catch(done);
    });
    
    })