let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master - should create master object', function(done) {
        let targetObject = {
            getValue: function() {
                return 42;
            },
            asyncMethod: function() {
                return q.resolve('async result');
            }
        };
        
        let master = q.master(targetObject);
        
        assert(master !== null, 'Master should not be null');
        assert(typeof master === 'object', 'Master should be an object');
        done();
    });

    })