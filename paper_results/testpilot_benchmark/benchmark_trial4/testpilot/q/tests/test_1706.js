let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set with immediate object', function(done) {
        let obj = { name: 'initial' };
        
        Q.set(obj, 'name', 'updated')
            .then(function(result) {
                assert.strictEqual(obj.name, 'updated');
                assert.strictEqual(result, 'updated');
                done();
            })
            .catch(done);
    });

    })