let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - preserves resolution when finally returns value', function(done) {
        let originalValue = 'original';
        
        q.resolve(originalValue)
            .finally(function() {
                return 'finally return value';
            })
            .then(function(value) {
                assert.strictEqual(value, originalValue, 'original resolved value should be preserved');
                done();
            })
            .catch(done);
    });

    })