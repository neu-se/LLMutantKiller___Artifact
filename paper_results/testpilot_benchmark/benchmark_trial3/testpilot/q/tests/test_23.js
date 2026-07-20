let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle null and undefined values', function(done) {
        let nullResult = q(null);
        let undefinedResult = q(undefined);
        
        Promise.all([
            nullResult.then(val => assert.strictEqual(val, null)),
            undefinedResult.then(val => assert.strictEqual(val, undefined))
        ]).then(() => done()).catch(done);
    });
});