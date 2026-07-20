let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify returns a function', function() {
        function nodeStyleFunction(callback) {
            callback(null, 'test');
        }
        
        const promise = q.makePromise(nodeStyleFunction, function(resolver) {
            return function() {
                nodeStyleFunction(resolver);
            };
        });
        
        const denodeified = promise.denodeify();
        
        assert.strictEqual(typeof denodeified, 'function');
    });
});