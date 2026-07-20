let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with nested field access', function(done) {
        let input = [
            {user: {id: 1}, value: 'a'},
            {user: {id: 2}, value: 'b'},
            {user: {id: 2}, value: 'c'},
            {user: {id: 3}, value: 'd'}
        ];
        let expected = [
            {user: {id: 2}, value: 'b'},
            {user: {id: 2}, value: 'c'}
        ];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.nonUnique('user.id'),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});