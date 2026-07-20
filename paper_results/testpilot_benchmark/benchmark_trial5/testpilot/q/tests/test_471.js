let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with immediate object', function(done) {
        const obj = { foo: 'bar', num: 42 };
        
        q.get(obj, 'foo').then(function(value) {
            assert.strictEqual(value, 'bar');
            done();
        }).catch(done);
    });

    })