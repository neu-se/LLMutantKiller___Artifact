let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that yields multiple promises', function(done) {
        let results = [];
        
        function* multiYieldGenerator() {
            let a = yield q.resolve(1);
            results.push(a);
            let b = yield q.resolve(2);
            results.push(b);
            let c = yield q.resolve(3);
            results.push(c);
        }
        
        q.spawn(multiYieldGenerator);
        
        setTimeout(() => {
            assert.deepEqual(results, [1, 2, 3]);
            done();
        }, 10);
    });

    })