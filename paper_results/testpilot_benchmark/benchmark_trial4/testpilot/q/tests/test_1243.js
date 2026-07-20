let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test ninvoke with no additional arguments', function(done) {
        let mockObject = {
            getTimestamp: function(callback) {
                setTimeout(() => {
                    callback(null, Date.now());
                }, 10);
            }
        };

        let promisifiedObject = q(mockObject);

        promisifiedObject.ninvoke('getTimestamp')
            .then(function(result) {
                assert(typeof result === 'number');
                assert(result > 0);
                done();
            })
            .catch(done);
    });

    })