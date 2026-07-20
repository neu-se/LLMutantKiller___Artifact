let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with basic addition', function(done) {
        var eventualAdd = q.async(function* (oneP, twoP) {
            var one = yield oneP;
            var two = yield twoP;
            return one + two;
        });
        
        var eventualOne = q.resolve(1);
        var eventualTwo = q.resolve(2);
        
        eventualAdd(eventualOne, eventualTwo).then(function (three) {
            assert.equal(three, 3);
            done();
        }).catch(done);
    });
    
    })