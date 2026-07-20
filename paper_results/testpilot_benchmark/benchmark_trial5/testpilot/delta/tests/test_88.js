let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test rest method', function(done) {
        const ops = [
            { insert: 'Hello' },
            { retain: 5 },
            { delete: 3 }
        ];
        const iterator = new quill_delta.OpIterator(ops);
        
        // At beginning
        let rest = iterator.rest();
        assert.deepStrictEqual(rest, ops);
        
        // After consuming one op
        iterator.next();
        rest = iterator.rest();
        assert.deepStrictEqual(rest, [{ retain: 5 }, { delete: 3 }]);
        
        // After partial consumption
        iterator.index = 0;
        iterator.offset = 0;
        iterator.next(2); // Consume part of first op
        rest = iterator.rest();
        assert.deepStrictEqual(rest, [
            { insert: 'llo' },
            { retain: 5 },
            { delete: 3 }
        ]);
        
        // When no more ops
        iterator.next(); // consume rest of ops
        iterator.next();
        iterator.next();
        rest = iterator.rest();
        assert.deepStrictEqual(rest, []);
        done();
    });

    })