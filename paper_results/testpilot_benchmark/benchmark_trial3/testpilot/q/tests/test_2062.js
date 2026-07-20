let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with non-promise object', function(done) {
        let simpleValue = 'not a promise';
        
        q.done(simpleValue, function(value) {
            assert.equal(value, 'not a promise');
            done();
        });
    });

    })