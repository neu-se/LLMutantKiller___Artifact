let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with property access', function(done) {
        let testObject = {
            name: 'test object',
            value: 123
        };
        
        let master = q.master(testObject);
        
        // Test property access
        master.get('name').then(function(result) {
            assert.strictEqual(result, 'test object', 'should access properties correctly');
            done();
        }).catch(done);
    });

    })