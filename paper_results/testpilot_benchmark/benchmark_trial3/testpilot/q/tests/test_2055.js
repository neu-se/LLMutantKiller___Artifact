let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with plain value', function(done) {
        let plainValue = 42;
        
        q.done(plainValue, function(value) {
            assert.strictEqual(value, plainValue);
            done();
        }, function(error) {
            done(error);
        });
    });

    })