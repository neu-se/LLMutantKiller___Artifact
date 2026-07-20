let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with line attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'Bold line\n', attributes: { bold: true } },
            { insert: 'Normal line\n' }
        ]);
        
        let attributes = [];
        
        delta.eachLine((line, attrs, i) => {
            attributes.push(attrs);
        });
        
        assert.equal(attributes.length, 2);
        assert.deepEqual(attributes[0], { bold: true });
        assert.deepEqual(attributes[1], {});
        done();
    });

    })