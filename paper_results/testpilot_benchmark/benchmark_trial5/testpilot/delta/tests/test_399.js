let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach callback parameters', function(done) {
        let delta = new quill_delta([
            { insert: 'Test', attributes: { color: 'red' } },
            { retain: 2 }
        ]);
        
        let results = [];
        delta.forEach(function(op, index) {
            results.push({
                hasInsert: op.insert !== undefined,
                hasRetain: op.retain !== undefined,
                hasAttributes: op.attributes !== undefined,
                index: index
            });
        });
        
        assert.equal(results.length, 2);
        assert.equal(results[0].hasInsert, true);
        assert.equal(results[0].hasAttributes, true);
        assert.equal(results[0].index, 0);
        assert.equal(results[1].hasRetain, true);
        assert.equal(results[1].hasAttributes, false);
        assert.equal(results[1].index, 1);
        done();
    });

    })