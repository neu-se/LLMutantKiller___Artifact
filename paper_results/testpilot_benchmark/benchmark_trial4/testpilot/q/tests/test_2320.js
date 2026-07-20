let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost - method with multiple arguments', function(done) {
        let testObj = {
            concat: function(str1, str2, str3, callback) {
                setTimeout(() => {
                    callback(null, str1 + str2 + str3);
                }, 10);
            }
        };

        q.npost(testObj, 'concat', ['Hello', ' ', 'World'])
            .then(function(result) {
                assert.equal(result, 'Hello World');
                done();
            })
            .catch(done);
    });
});