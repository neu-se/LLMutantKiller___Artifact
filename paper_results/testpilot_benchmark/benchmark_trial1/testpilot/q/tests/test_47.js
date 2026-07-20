let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with get method', function(done) {
        let testObject = { foo: 'bar', nested: { value: 42 } };
        
        let descriptor = {
            when: function() {
                return testObject;
            },
            get: function(key) {
                return testObject[key];
            }
        };
        
        let promise = q.makePromise(descriptor);
        
        promise.get('foo').then(function(value) {
            assert.equal(value, 'bar');
            return promise.get('nested');
        }).then(function(nested) {
            assert.deepEqual(nested, { value: 42 });
            done();
        }).catch(done);
    });

    })