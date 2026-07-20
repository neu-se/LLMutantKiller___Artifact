let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind - function that throws error', function(done) {
        function errorFunction() {
            throw new Error('Test error');
        }
        
        let obj = {};
        let boundFunction = q.fbind(errorFunction, obj);
        
        boundFunction().then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
});