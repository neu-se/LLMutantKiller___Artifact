let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - finds object with specific property', function(done) {
        const objects = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ];
        
        pull_stream(
            pull_stream.values(objects),
            pull_stream.find(obj => obj.name === 'Bob', (err, result) => {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, { id: 2, name: 'Bob' });
                done();
            })
        );
    });

    })