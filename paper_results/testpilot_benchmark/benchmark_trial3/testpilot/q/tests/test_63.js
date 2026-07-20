let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter executes multiple tasks in order', function(done) {
        let results = [];
        
        let task1 = function() { results.push(1); };
        let task2 = function() { results.push(2); };
        let task3 = function() { results.push(3); };
        
        q.nextTick.runAfter(task1);
        q.nextTick.runAfter(task2);
        q.nextTick.runAfter(task3);
        
        process.nextTick(function() {
            assert.deepStrictEqual(results, [1, 2, 3]);
            done();
        });
    });
    
    })