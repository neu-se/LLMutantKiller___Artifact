let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled promise', function(done) {
        let fulfilled = false;
        
        q.resolve('test value')
            .done(function(value) {
                fulfilled = true;
                assert.equal(value, 'test value');
                done();
            });
    });

    })