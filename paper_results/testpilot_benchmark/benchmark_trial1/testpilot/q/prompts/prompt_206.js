The test:
```
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
        
        let promisifiedFn = q.denodeify(mockComplexFunction);
        let testObj = { name: 'test' };
        let testArr = [1, 2, 3];
        let testNum = 10;
        
        promisifiedFn.nfapply([testObj, testArr, testNum])
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
``` 
failed with the following error message:
```
promisifiedFn.nfapply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.