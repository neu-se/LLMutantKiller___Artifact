let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - with complex arguments', function(done) {
        function mockComplexFunction(obj, arr, num, callback) {
            setTimeout(() => {
                callback(null, {
                    obj: obj,
                    arr: arr,
                    num: num,
                    total: arr.reduce((a, b) => a + b, 0) + num
                });
            }, 10);
        }
        
        let testObj = { name: 'test' };
        let testArr = [1, 2, 3];
        let testNum = 10;
        
        q.nfapply(mockComplexFunction, [testObj, testArr, testNum])
            .then(result => {
                assert.deepStrictEqual(result.obj, testObj);
                assert.deepStrictEqual(result.arr, testArr);
                assert.strictEqual(result.num, testNum);
                assert.strictEqual(result.total, 16);
                done();
            })
            .catch(done);
    });
});