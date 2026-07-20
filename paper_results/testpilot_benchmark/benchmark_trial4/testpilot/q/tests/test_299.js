let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with same string values', function(done) {
        q.join('hello', 'hello').then(function(result) {
            assert.strictEqual(result, 'hello');
            done();
        }).catch(done);
    });

    })