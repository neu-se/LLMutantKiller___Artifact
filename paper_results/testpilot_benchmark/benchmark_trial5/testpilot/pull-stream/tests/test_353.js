let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.unique - with field selector and invert', function(done) {
        const input = [
            {id: 1, name: 'Alice'},
            {id: 2, name: 'Bob'},
            {id: 1, name: 'Alice Clone'},
            {id: 3, name: 'Charlie'},
            {id: 2, name: 'Bob Clone'},
            {id: 4, name: 'David'}
        ];
        const expected = [
            {id: 1, name: 'Alice Clone'},
            {id: 2, name: 'Bob Clone'}
        ]; // only items with duplicate ids
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.unique('id', true),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, expected);
                done();
            })
        );
    });

    })