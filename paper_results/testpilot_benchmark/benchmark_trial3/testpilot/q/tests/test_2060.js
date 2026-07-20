let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled callback and value', function(done) {
        let testValue = { data: 'test' };
        let promise = q.resolve(testValue);
        
        q.done(promise, function(value) {
            assert.deepEqual(value, testValue);
            done();
        });
    });

    })