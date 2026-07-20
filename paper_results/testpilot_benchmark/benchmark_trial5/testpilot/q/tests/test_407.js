let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with array object', function(done) {
        let testArray = [1, 2, 3, 'test'];
        let master = q.master(testArray);
        
        assert(typeof master.isDef === 'function', 'master should work with arrays');
        
        // Test that we can inspect arrays
        let inspection = master.inspect();
        assert(inspection !== null, 'inspect should work with arrays');
        
        done();
    });

    })