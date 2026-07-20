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
            pull_stream.filter(obj => obj.name === 'Bob'),
            pull_stream.take(1),
            pull_stream.collect((err, results) => {
                assert.strictEqual(err, null);
                assert.strictEqual(results.length, 1);
                assert.deepStrictEqual(results[0], { id: 2, name: 'Bob' });
                done();
            })
        );
    });
});