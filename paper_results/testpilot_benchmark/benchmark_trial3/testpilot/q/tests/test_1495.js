let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with property access', function(done) {
        let testObject = {
            name: 'test',
            nested: { value: 123 }
        };
        
        let master = q.master(testObject);
        
        // Test property access
        master.get('name').then(function(result) {
            assert.strictEqual(result, 'test');
            return master.get('nested');
        }).then(function(result) {
            assert.deepStrictEqual(result, { value: 123 });
            done();
        }).catch(done);
    });

    })