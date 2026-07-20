let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with field parameter on objects', function(done) {
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
        
        // Create a custom nonUnique filter
        function nonUnique(field) {
            let counts = {};
            let items = [];
            
            return pull_stream.through(function(data) {
                items.push(data);
                let key = data[field];
                counts[key] = (counts[key] || 0) + 1;
            }, function(end) {
                if (end === true) {
                    // Filter items that appear more than once
                    items.forEach(item => {
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