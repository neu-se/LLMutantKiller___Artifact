let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test fcall with various argument types', function(done) {
        let testFunction = function(str, num, obj, arr) {
            return {
                str: str,
                num: num,
                obj: obj,
                arr: arr
            };
        };
        
        let promise = q.resolve(testFunction);
        let testObj = { key: 'value' };
        let testArr = [1, 2, 3];
        
        promise.fcall('hello', 42, testObj, testArr).then(function(result) {
            assert.strictEqual(result.str, 'hello');
            assert.strictEqual(result.num, 42);
            assert.deepStrictEqual(result.obj, testObj);
            assert.deepStrictEqual(result.arr, testArr);
            done();
        }).catch(done);
    });
});