let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.fromGeoJSON with valid point', function(done) {
        const geoJSON = {
            type: 'Point',
            coordinates: [-0.15, 51.5]
        };
        
        const point = geo_point.GeoPoint.fromGeoJSON(geoJSON);
        
        assert(point !== null, 'Point should not be null');
        assert(point !== undefined, 'Point should not be undefined');
        done();
    });
    
    })