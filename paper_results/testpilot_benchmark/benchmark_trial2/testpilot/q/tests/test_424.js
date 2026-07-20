let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with simple generator', function(done) {
        function* simpleGenerator() {
            yield 1;
            yield 2;
            return 3;
        }
        
        q.spawn(simpleGenerator)
            .then(function(result) {
                assert.equal(result, 3);
                done();
            })
            .catch(done);
    });
    
    })