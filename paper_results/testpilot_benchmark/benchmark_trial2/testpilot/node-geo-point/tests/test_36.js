let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toObject with zero coordinates', function(done) {
        // Test with zero coordinates
        let point2 = new geo_point.GeoPoint(0, 0);
        let obj2 = point2.toObject();
        
        assert.strictEqual(typeof obj2, 'object');
        
        // Check if the object has latitude/longitude properties with common naming conventions
        if (obj2.hasOwnProperty('latitude') && obj2.hasOwnProperty('longitude')) {
            assert.strictEqual(obj2.latitude, 0);
            assert.strictEqual(obj2.longitude, 0);
        } else if (obj2.hasOwnProperty('lat') && obj2.hasOwnProperty('lng')) {
            assert.strictEqual(obj2.lat, 0);
            assert.strictEqual(obj2.lng, 0);
        } else if (obj2.hasOwnProperty('lat') && obj2.hasOwnProperty('lon')) {
            assert.strictEqual(obj2.lat, 0);
            assert.strictEqual(obj2.lon, 0);
        } else {
            // If none of the common conventions work, check what properties exist
            let props = Object.keys(obj2);
            assert.fail(`Unexpected object structure. Properties found: ${props.join(', ')}`);
        }
        
        done();
    });
});