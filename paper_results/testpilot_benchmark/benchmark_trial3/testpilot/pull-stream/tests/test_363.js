let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with nested field', function(done) {
        const data = [
            { user: { id: 1 }, value: 'a' },
            { user: { id: 2 }, value: 'b' },
            { user: { id: 1 }, value: 'c' },
            { user: { id: 3 }, value: 'd' }
        ];
        
        // Create a custom nonUnique transform that filters for duplicate values based on a nested field
        const nonUnique = (field) => {
            const seen = new Set();
            const duplicates = [];
            
            return pull_stream.through(function(data) {
                const fieldValue = field.spl})}    })
})