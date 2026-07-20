let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled promise', function(done) {
        let result = null;
        
        q.resolve('success')
            .done(function(value) {
                result = value;
                assert.equal(result, 'success');
                done();
            });
    });

    })