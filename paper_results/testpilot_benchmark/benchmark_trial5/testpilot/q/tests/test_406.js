let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with null object', function(done) {
        let master = q.master(null);
        
        assert(typeof master.isDef === 'function', 'master should have isDef method even with null');
        
        // Test inspection with null
        let inspection = master.inspect();
        assert(inspection !== undefined, 'inspect should handle null objects');
        
        done();
    });

    })