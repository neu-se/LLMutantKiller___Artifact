let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test', function(done) {
        let db = dirty();
        let results = [];
        
        setTimeout(() => {
            assert.strictEqual(results.length, 0);
            done();
        }, 10);
    });
});