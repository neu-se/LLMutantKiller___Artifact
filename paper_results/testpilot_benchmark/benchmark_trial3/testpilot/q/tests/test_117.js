let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - integration with fs-like callback', function(done) {
        let deferred = q.defer();
        let resolver = deferred.makeNodeResolver();
        
        // Simulate a file system operation
        function mockReadFile(filename, callback) {
            setTimeout(() => {
                if (filename === 'existing.txt') {
                    callback(null, 'file contents');
                } else {
                    callback(new Error('ENOENT: no such file or directory'));
                }
            }, 10);
        }
        
        mockReadFile('existing.txt', resolver);
        
        deferred.promise.then(contents => {
            assert.strictEqual(contents, 'file contents');
            done();
        }).catch(done);
    });
});