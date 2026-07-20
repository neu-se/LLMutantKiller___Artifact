let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - with context binding', function(done) {
        const context = { multiplier: 2 };
        
        function mockNodeFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * this.multiplier);
            }, 10);
        }

        const boundFunc = q.nbind(mockNodeFunction, context, 10);
        
        boundFunc().then(result => {
            assert.strictEqual(result, 20);
            done();
        }).catch(done);
    });
});