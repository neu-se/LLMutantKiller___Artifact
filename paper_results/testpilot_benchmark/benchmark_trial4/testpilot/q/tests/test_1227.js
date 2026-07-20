let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - nonexistent method', function(done) {
        let mockObject = {};
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            if (!mockObject[name]) {
                throw new Error('Method not found: ' + name);
            }
            return mockObject[name].apply(mockObject, args);
        });
        
        promisedObject.npost('nonexistentMethod', [])
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert(error.message.includes('Method not found'));
                done();
            });
    });
});