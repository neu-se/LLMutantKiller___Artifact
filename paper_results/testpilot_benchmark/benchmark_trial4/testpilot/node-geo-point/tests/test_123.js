let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile - extreme coordinates', function(done) {
        // Test with extreme latitude (near poles)
        let northPole = { lat: 85, lng: 0 };
        let southPole = { lat: -85, lng: 0 };
        let zoom = 8;
        
        let tileNorth = geo_point.GeoPoint.toTile(northPole, zoom);
        let tileSouth = geo_point.GeoPoint.toTile(southPole, zoom);
        
        assert(typeof tileNorth.x === 'number', 'North pole tile.x should be a number');
        assert(typeof tileNorth.y === 'number', 'North pole tile.y should be a number');
        assert(typeof tileSouth.x === 'number', 'South pole tile.x should be a number');
        assert(typeof tileSouth.y === 'number', 'South pole tile.y should be a number');
        
        done();
    });

    })