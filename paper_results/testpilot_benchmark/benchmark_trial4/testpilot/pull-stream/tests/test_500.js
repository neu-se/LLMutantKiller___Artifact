let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should find first matching element with property name', function(done) {
        const data = [
            { name: 'Alice', active: false },
            { name: 'Bob', active: true },
            { name: 'Charlie', active: true }
        ];
        
        pull_stream(
            pull_stream.values(data),
            pull_stream.filter(item => item.active),
            pull_stream.take(1),
            pull_stream.collect((err, result) => {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result[0], { name: 'Bob', active: true });
                done();
            })
        );
    });
});