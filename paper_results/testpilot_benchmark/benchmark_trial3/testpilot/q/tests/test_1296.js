let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with plain value', function(done) {
        q.when('plain value',
            function(value) {
                assert.equal(value, 'plain value');
                done();
            },
            function(error) {
                done(error);
            }
        );
    });

    })