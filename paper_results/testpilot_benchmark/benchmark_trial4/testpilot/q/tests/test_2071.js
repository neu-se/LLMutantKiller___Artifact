let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with non-promise object', function(done) {
        let plainValue = 'plain string';
        
        q.done(plainValue, function(value) {
            assert.equal(value, 'plain string');
            done();
        });
    });

    })