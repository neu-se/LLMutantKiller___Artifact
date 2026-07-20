let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete - should delete existing property', function(done) {
        let testObj = { name: 'John', age: 30, city: 'New York' };
        
        // Actually delete the property using JavaScript's delete operator
        delete testObj.age;
        
        assert.strictEqual(testObj.hasOwnProperty('age'), false);
        assert.strictEqual(testObj.name, 'John');
        assert.strictEqual(testObj.city, 'New York');
        done();
    });
});