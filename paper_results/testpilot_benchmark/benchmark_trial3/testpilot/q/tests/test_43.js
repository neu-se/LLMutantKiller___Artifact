let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes multiple callbacks in order', function(done) {
        let results = [];
        let completedCount = 0;
        
        q.nextTick(function() {
            results.push(1);
            completedCount++;
            if (completedCount === 2) {
                assert.deepStrictEqual(results, [1, 2]);
                done();
            }
        });
        
        q.nextTick(function() {
            results.push(2);
            completedCount++;
            if (completedCount === 2) {
                assert.deepStrictEqual(results, [1, 2]);
                done();
            }
        });
    });
    
    })