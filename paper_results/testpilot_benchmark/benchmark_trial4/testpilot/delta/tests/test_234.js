let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - complex attributes', function(done) {
        // Test with more complex attributes
        let attr = { 
            bold: true, 
            italic: false, 
            color: 'blue',
            size: '14px'
        };
        let base = { 
            bold: false, 
            italic: true, 
            color: 'red',
            underline: true
        };
        let result = quill_delta.AttributeMap.invert(attr, base);
        
        assert.deepEqual(result, { 
            bold: false, 
            italic: true, 
            color: 'red',
            size: null
        });
        done();
    });

    })