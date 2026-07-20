let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with promise object', function(done) {
        let promiseObject = q.resolve({ async: 'value' });
        let master = q.master(promiseObject);
        
        master.then(function(result) {
            assert.deepStrictEqual(result, { async: 'value' });
            done();
        }).catch(done);
    });

    })