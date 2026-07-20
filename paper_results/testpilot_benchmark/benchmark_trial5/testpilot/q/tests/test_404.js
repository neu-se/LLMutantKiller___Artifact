let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with simple object', function(done) {
        let testObject = { name: 'test', value: 123 };
        let master = q.master(testObject);
        
        // Test that we can call isDef
        master.isDef();
        
        // Test inspection functionality
        let inspection = master.inspect();
        assert(inspection !== null, 'inspect should return a value');
        
        done();
    });

    })