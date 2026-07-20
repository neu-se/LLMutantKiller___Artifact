let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with zero coordinates', function(done) {
        // Test with zero coordinates
        let point2 = new geo_point.GeoPoint(0, 0);
        let obj2 = point2.toObject();
        
        assert.strictEqual(typeof obj2, 'object');
        assert.strictEqual(obj2.lat, 0);
        assert.strictEqual(obj2.lon, 0);
        
        done();
    });
    
    })