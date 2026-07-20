let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - handles empty array', function(done) {
        let mainPromise = q.resolve([]);
        
        mainPromise.all().then(function(results) {
            assert.deepEqual(results, []);
            done();
        }).catch(done);
    });
    
    })