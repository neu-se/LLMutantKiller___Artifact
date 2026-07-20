let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with nested field', function(done) {
        let input = [
            {user: {id: 1}, value: 'a'},
            {user: {id: 2}, value: 'b'},
            {user: {id: 2}, value: 'c'},
            {user: {id: 3}, value: 'd'}
        ];
        let expected = [
            {user: {id: 2}, value: 'b'},
            {user: {id: 2}, value: 'c'}
        ];
        
        // Create a custom nonUnique filter
        function nonUnique(path) {
            let seen = {};
            let counts = {};
            
            return pull_stream.through(function(data) {
                let value = path.spl})}    })
})