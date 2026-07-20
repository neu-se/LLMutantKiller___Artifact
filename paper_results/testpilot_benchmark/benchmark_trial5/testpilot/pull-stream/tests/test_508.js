let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - finds object with property', function(done) {
        const objects = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ];
        
        pull_stream(
            pull_stream.values(objects),
            pull_stream.find(obj => obj.name === 'Bob'),
            pull_stream.drain((result) => {
                assert.deepStrictEqual(result, { id: 2, name: 'Bob' });
                done();
            }, (err) => {
                if (err) done(err);
            })
        );
    });
});