let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with object property', function(done) {
        let testObj = { name: 'John', age: 30 };
        
        q.get(testObj, 'name')
            .then(function(result) {
                assert.strictEqual(result, 'John');
                done();
            })
            .catch(done);
    });

    })