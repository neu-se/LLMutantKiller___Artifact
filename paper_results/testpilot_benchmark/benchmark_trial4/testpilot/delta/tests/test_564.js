let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat - mixed operations', function(done) {
        let delta1 = new quill_delta([
            { insert: 'Hello' },
            { retain: 5 }
        ]);
        let delta2 = new quill_delta([
            { delete: 2 },
            { insert: 'World' }
        ]);
        
        let result = delta1.concat(delta2);
        
        assert.equal(result.ops.length, 4);
        assert.equal(result.ops[0].insert, 'Hello');
        assert.equal(result.ops[1].retain, 5);
        assert.equal(result.ops[2].delete, 2);
        assert.equal(result.ops[3].insert, 'World');
        done();
    });

    })