let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.unique - with field parameter for objects', function(done) {
        const input = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 1, name: 'Alice Clone' },
            { id: 3, name: 'Charlie' },
            { id: 2, name: 'Bob Clone' }
        ];
        const expected = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.unique('id'),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, expected);
                done();
            })
        );
    });

    })