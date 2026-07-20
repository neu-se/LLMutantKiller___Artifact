let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with no arguments', function(done) {
        const mockObject = {
            simpleMethod: function(callback) {
                callback(null, 'no args result');
            }
        };

        q.ninvoke(mockObject, 'simpleMethod')
            .then(result => {
                assert.strictEqual(result, 'no args result');
                done();
            })
            .catch(done);
    });

    })