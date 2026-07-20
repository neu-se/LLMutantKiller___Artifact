let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with empty generator', function(done) {
        let executed = false;
        
        function* emptyGenerator() {
            executed = true;
        }
        
        q.spawn(emptyGenerator);
        
        setTimeout(() => {
            assert.equal(executed, true);
            done();
        }, 10);
    });

    })