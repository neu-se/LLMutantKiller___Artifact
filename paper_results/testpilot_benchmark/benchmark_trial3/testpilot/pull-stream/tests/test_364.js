let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('.').reduce((obj, key) => obj && obj[key], data);
                
                if (seen.has(fieldValue)) {
                    duplicates.push(data);
                } else {
                    seen.add(fieldValue);
                }
            }, function(end) {
                if (end !== true) return this.queue(end);
                
                // Queue all duplicates
                duplicates.forEach(item => this.queue(item));
                this.queue(null);
            });
        };
        
        pull_stream(
            pull_stream.values(data),
            nonUnique('user.id'),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.equal(result.length, 2);
                assert.deepEqual(result, [
                    { user: { id: 1 }, value: 'a' },
                    { user: { id: 1 }, value: 'c' }
                ]);
                done();
            })
        );
    });
});