let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with object transformation', function(done) {
        const source = pull_stream.values([
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 35 }
        ]);
        const mapper = pull_stream.map(person => ({ ...person, isAdult: person.age >= 18 }));
        const sink = pull_stream.collect((err, results) => {
            assert.ifError(err);
            assert.deepEqual(results, [
                { name: 'Alice', age: 25, isAdult: true },
                { name: 'Bob', age: 30, isAdult: true },
                { name: 'Charlie', age: 35, isAdult: true }
            ]);
            done();
        });
        
        pull_stream(source, mapper, sink);
    });

    })