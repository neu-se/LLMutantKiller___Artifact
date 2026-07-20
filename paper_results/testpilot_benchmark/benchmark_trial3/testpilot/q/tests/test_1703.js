let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set with new property', function(done) {
        let obj = {};
        
        Q.set(obj, 'newProp', 'newValue')
            .then(function(result) {
                assert.equal(obj.newProp, 'newValue');
                done();
            })
            .catch(done);
    });

    })