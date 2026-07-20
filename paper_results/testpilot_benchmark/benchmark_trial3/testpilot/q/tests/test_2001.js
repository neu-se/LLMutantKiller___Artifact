let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with promise that throws in then', function(done) {
        let promise = q.resolve('initial').then(function() {
            throw new Error('Thrown in then');
        });
        
        q.catch(promise, function(error) {
            assert(error instanceof Error);
            assert.strictEqual(error.message, 'Thrown in then');
            return 'recovered';
        }).then(function(result) {
            assert.strictEqual(result, 'recovered');
            done();
        }).catch(done);
    });
});