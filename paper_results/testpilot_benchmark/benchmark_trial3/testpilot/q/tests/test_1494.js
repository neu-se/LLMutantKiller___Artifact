let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with simple object dispatch', function(done) {
        let testObject = {
            getValue: function() { return 'test value'; },
            add: function(a, b) { return a + b; }
        };
        
        let master = q.master(testObject);
        
        // Test method dispatch
        master.getValue().then(function(result) {
            assert.strictEqual(result, 'test value');
            return master.add(5, 3);
        }).then(function(result) {
            assert.strictEqual(result, 8);
            done();
        }).catch(done);
    });

    })