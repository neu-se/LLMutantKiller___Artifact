let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set with immediate object', function(done) {
        let obj = { name: 'initial' };
        
        q.set(obj, 'name', 'updated')
            .then(function(result) {
                assert.strictEqual(obj.name, 'updated');
                done();
            })
            .catch(done);
    });

    })