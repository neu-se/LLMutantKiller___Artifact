let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict throws Error instance', function(done) {
        try {
            q.noConflict();
            done(new Error('Expected q.noConflict() to throw an error'));
        } catch (error) {
            assert(error instanceof Error, 'Expected thrown object to be an instance of Error');
            done();
        }
    });

    })