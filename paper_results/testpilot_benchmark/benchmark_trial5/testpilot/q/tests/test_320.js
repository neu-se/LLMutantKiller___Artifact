let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - multiple pre-bound arguments', function(done) {
        function mockNodeFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, a + b + c + d);
            }, 10);
        }
        
        const promiseFunc = q.makePromise(mockNodeFunction);
        const boundFunc = promiseFunc.nbind(null, 1, 2, 3);
        
        boundFunc(4).then(result => {
            assert.strictEqual(result, 10);
            done();
        }).catch(done);
    });

    })