let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with object field', function(done) {
        const data = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 1, name: 'Alice' },
            { id: 3, name: 'Charlie' },
            { id: 2, name: 'Bob' }
        ];
        
        pull_stream(
            pull_stream.values(data),
            pull_stream.nonUnique('id'),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.equal(result.length, 3);
                assert.deepEqual(result, [
                    { id: 1, name: 'Alice' },
                    { id: 2, name: 'Bob' },
                    { id: 2, name: 'Bob' }
                ]);
                done();
            })
        );
    });

    })