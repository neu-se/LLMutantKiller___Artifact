let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - with thisArg', function(done) {
        const testObj = {
            multiplier: 10,
            calculate: function(value, callback) {
                setTimeout(() => {
                    callback(null, value * this.multiplier);
                }, 10);
            }
        };
        
        const boundFunc = q.nbind(testObj.calculate, testObj);
        
        boundFunc(5)
            .then(result => {
                assert.strictEqual(result, 50);
                done();
            })
            .catch(done);
    });
});