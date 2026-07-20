let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject returns new object instance', function(done) {
        // Test that toObject returns a new object each time
        let point6 = new geo_point.GeoPoint(51.5074, -0.1278);
        let obj6a = point6.toObject();
        let obj6b = point6.toObject();
        
        assert.notStrictEqual(obj6a, obj6b); // Different object instances
        assert.deepStrictEqual(obj6a, obj6b); // But same content
        
        done();
    });
});