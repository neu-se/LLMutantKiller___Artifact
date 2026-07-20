let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with simple object dispatch', function(done) {
        let testObject = {
            getValue: function() { return 'test value'; },
            data: 'some data'
        };
        
        let master = q.master(testObject);
        
        // Test method dispatch
        master.invoke('getValue').then(function(result) {
            assert.strictEqual(result, 'test value', 'should dispatch method calls correctly');
            done();
        }).catch(done);
    });

    })