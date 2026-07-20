let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - with context binding', function(done) {
        let context = {
            multiplier: 10,
            calculate: function(a, b) {
                return q.resolve((a + b) * this.multiplier);
            }
        };
        
        let promiseFunc = q.makePromise(context.calculate);
        let boundFunc = promiseFunc.fbind(context, 5);
        
        boundFunc(3).then(function(result) {
            assert.equal(result, 80); // (5 + 3) * 10
            done();
        }).catch(done);
    });
    
    })