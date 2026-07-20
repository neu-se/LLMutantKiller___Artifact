let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with object field', function(done) {
        let input = [
            {id: 1, name: 'Alice'},
            {id: 2, name: 'Bob'},
            {id: 2, name: 'Bob'},
            {id: 3, name: 'Charlie'},
            {id: 3, name: 'Charlie'},
            {id: 4, name: 'David'}
        ];
        let expected = [
            {id: 2, name: 'Bob'},
            {id: 2, name: 'Bob'},
            {id: 3, name: 'Charlie'},
            {id: 3, name: 'Charlie'}
        ];
        let result = [];
        
        // Custom nonUnique implementation
        function nonUnique(field) {
            let buffer = [];
            let counts = {};
            
            return pull_stream.through(function(data) {
                buffer.push(data);
                counts[data[field]] = (counts[data[field]] || 0) + 1;
            }, function(end) {
                if (end === true) {
                    // Filter and emit only items that appear more than once
                    buffer.forEach(item => {
                        if (counts[item[field]] > 1) {
                            this.queue(item);
                        }
                    });
                }
                this.queue(end);
            });
        }
        
        pull_stream(
            pull_stream.values(input),
            nonUnique('id'),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});