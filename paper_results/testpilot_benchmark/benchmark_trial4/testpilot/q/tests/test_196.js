let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.race - works with non-promise values', function(done) {
        let racePromise = q.Promise.race(['immediate value', q.delay(100).then(() => 'delayed')]);
        
        racePromise.then(function(value) {
            assert.equal(value, 'immediate value');
            done();
        }).catch(done);
    });
    
    })