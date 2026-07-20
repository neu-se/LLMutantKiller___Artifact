let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test matches method', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        
        // Mock path and regex for testing
        const mockPath = {
            match: function(regex) {
                if (this.path.startsWith('/api/users/')) {
                    return [this.path, this.path.spl]}}}    })
})