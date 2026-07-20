let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with nested field', function(done) {
        const data = [
            { user: { id: 1 }, value: 'a' },
            { user: { id: 2 }, value: 'b' },
            { user: { id: 1 }, value: 'c' },
            { user: { id: 3 }, value: 'd' }
        ];
        
        pull_stream(
            pull_stream.values(data),
            pull_stream.nonUnique('user.id'),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.equal(result.length, 2);
                assert.deepEqual(result, [
                    { user: { id: 1 }, value: 'a' },
                    { user: { id: 1 }, value: 'c' }
                ]);
                done();
            })
        );
    });
});