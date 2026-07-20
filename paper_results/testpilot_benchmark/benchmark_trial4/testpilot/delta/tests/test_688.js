let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with attributes', function(done) {
        const delta1 = new Delta([
            {retain: 5, attributes: {bold: true}}
        ]);
        const delta2 = new Delta([
            {retain: 3, attributes: {italic: true}},
            {insert: 'text'}
        ]);
        
        const result = delta1.transform(delta2);
        assert.ok(result instanceof Delta);
        
        done();
    });

    })