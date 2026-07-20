let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with retain operations and attributes', function(done) {
        let delta1 = new Delta([{retain: 5, attributes: {bold: true}}]);
        let delta2 = new Delta([{retain: 5, attributes: {italic: true}}]);
        
        let result = delta1.transform(delta2);
        assert(result instanceof Delta);
        assert.strictEqual(result.ops.length, 1);
        assert.strictEqual(result.ops[0].retain, 5);
        done();
    });

    })