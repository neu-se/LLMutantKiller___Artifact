let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with simple object', function(done) {
        let testObject = { name: 'test', value: 123 };
        let master = q.master(testObject);
        
        // Test that we can call then on the master
        master.then(function(result) {
            // The result should be related to the original object
            assert(result !== undefined, 'result should not be undefined');
            done();
        }).catch(done);
    });

    })