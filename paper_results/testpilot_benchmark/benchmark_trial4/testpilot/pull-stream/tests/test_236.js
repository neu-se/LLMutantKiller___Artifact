let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with objects', function(done) {
        const source = pull_stream.values([
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 17 },
            { name: 'Charlie', age: 30 },
            { name: 'Diana', age: 16 }
        ]);
        const filter = pull_stream.filter(person => person.age >= 18); // filter adults
        const results = [];
        
        pull_stream(
            source,
            filter,
            pull_stream.drain(
                item => results.push(item),
                err => {
                    if (err) return done(err);
                    assert.deepEqual(results, [
                        { name: 'Alice', age: 25 },
                        { name: 'Charlie', age: 30 }
                    ]);
                    done();
                }
            )
        );
    });
});