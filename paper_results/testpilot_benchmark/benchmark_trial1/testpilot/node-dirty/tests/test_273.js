let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.get - should return value for existing key', function(done) {
        let db = new dirty();
        
        db.on('load', function() {
            // Set a value first
            db.set('testKey', {name: 'John', age: 30});
            
            // Test getting the value
            let result = db.get('testKey');
            
            assert.strictEqual(result.name, 'John');
            assert.strictEqual(result.age, 30);
            done();
        });
    });

    })