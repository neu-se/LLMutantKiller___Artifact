let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should handle numeric string keys', function(done) {
        let testObj = { '0': 'zero', '1': 'one', '2': 'two' };
        let promise = q.resolve(testObj);
        
        promise.get('1').then(function(value) {
            assert.strictEqual(value, 'one');
            done();
        }).catch(done);
    });

    })