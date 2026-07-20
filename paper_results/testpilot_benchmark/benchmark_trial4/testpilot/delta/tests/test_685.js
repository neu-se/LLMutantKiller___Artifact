let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with delete operations', function(done) {
        const delta1 = new Delta([{delete: 3}]);
        const delta2 = new Delta([{retain: 2}, {insert: 'X'}]);
        
        const result = delta1.transform(delta2);
        assert.ok(result instanceof Delta);
        
        done();
    });

    })