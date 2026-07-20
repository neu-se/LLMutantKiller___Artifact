let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test next method with retain operations', function(done) {
        const ops = [{ retain: 10, attributes: { bold: true } }];
        const iterator = new quill_delta.OpIterator(ops);
        
        let result = iterator.next(5);
        assert.deepStrictEqual(result, { retain: 5, attributes: { bold: true } });
        
        result = iterator.next();
        assert.deepStrictEqual(result, { retain: 5, attributes: { bold: true } });
        done();
    });
});