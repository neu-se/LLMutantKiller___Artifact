let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with object transformation', function(done) {
        const source = pull_stream.values([
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 35 }
        ]);
        const mapper = (obj) => ({ ...obj, isAdult: obj.age >= 18 });
        const results = [];
        
        pull_stream(
            source,
            pull_stream.map(mapper),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(results, [
                        { name: 'Alice', age: 25, isAdult: true },
                        { name: 'Bob', age: 30, isAdult: true },
                        { name: 'Charlie', age: 35, isAdult: true }
                    ]);
                    done();
                }
            )
        );
    });
});