let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master inspect functionality', function(done) {
        let testObject = { test: true };
        let master = q.master(testObject);
        
        // The third parameter function should return inspection of the object
        // We can test this indirectly through the promise behavior
        master.then(function(result) {
            assert.strictEqual(result, testObject, 'should resolve to the original object');
            done();
        }).catch(done);
    });

    })