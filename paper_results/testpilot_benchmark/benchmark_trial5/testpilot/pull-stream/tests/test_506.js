let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('should find first matching element with property name', function(done) {
        const data = [
            { name: 'Alice', active: false },
            { name: 'Bob', active: true },
            { name: 'Charlie', active: true }
        ];
        
        pull(
            pull.values(data),
            pull.filter(item => item.active),
            pull.take(1),
            pull.collect((err, results) => {
                assert.strictEqual(err, null);
                assert.strictEqual(results.length, 1);
                assert.deepStrictEqual(results[0], { name: 'Bob', active: true });
                done();
            })
        );
    });
});