let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat with empty first delta', function(done) {
        const delta1 = new quill_delta();
        const delta2 = new quill_delta([{insert: 'World'}, {retain: 2}]);
        
        const result = delta1.concat(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'World'}, {retain: 2}]);
        done();
    });
});