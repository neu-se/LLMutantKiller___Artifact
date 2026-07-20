let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set with undefined value', function(done) {
        let obj = { prop: 'initial' };
        
        Q.set(obj, 'prop', undefined)
            .then(function(result) {
                assert.equal(obj.prop, undefined);
                done();
            })
            .catch(done);
    });
});