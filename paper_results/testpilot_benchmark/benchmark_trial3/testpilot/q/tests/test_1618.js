let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with multiple arguments', function(done) {
        function concatenateStrings(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        const promisedConcat = q.promised(concatenateStrings);
        
        const result = promisedConcat(
            q.resolve('Hello'),
            q.resolve(' '),
            q.resolve('World')
        );
        
        result.then(function(concatenated) {
            assert.equal(concatenated, 'Hello World');
            done();
        }).catch(done);
    });
});