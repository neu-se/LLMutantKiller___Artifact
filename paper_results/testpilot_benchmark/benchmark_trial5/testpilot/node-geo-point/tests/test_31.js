let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject returns new object instance', function(done) {
        // Test that toObject returns a new object each time
        let point4 = new geo_point.GeoPoint(51.5074, -0.1278);
        let obj4a = point4.toObject();
        let obj4b = point4.toObject();
        
        assert.notStrictEqual(obj4a, obj4b); // Different object instances
        assert.deepStrictEqual(obj4a, obj4b); // But same content
        
        done();
    });
    
    })