let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - nonexistent method', function(done) {
        let mockObject = {};
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            if (typeof this[name] !== 'function') {
                throw new Error('Method not found: ' + name);
            }
            return this[name].apply(this, args);
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