let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with object properties', function(done) {
        const source = pull_stream.values([
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 17 },
            { name: 'Charlie', age: 30 },
            { name: 'David', age: 16 }
        ]);
        const isAdult = (person) => person.age >= 18;
        const results = [];
        
        pull_stream(
            source,
            pull_stream.filter(isAdult),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.strictEqual(results.length, 2);
                    assert.strictEqual(results[0].name, 'Alice');
                    assert.strictEqual(results[1].name, 'Charlie');
                    done();
                }
            )
        );
    });
});