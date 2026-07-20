let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should call tap callback and pass through value', function(done) {
        let tapCalled = false;
        let tapValue = null;
        
        let promise = q.resolve(42);
        
        promise.tap(function(value) {
            tapCalled = true;
            tapValue = value;
        }).then(function(result) {
            assert.strictEqual(tapCalled, true, 'tap callback should be called');
            assert.strictEqual(tapValue, 42, 'tap callback should receive the resolved value');
            assert.strictEqual(result, 42, 'original value should pass through');
            done();
        }).catch(done);
    });

    })