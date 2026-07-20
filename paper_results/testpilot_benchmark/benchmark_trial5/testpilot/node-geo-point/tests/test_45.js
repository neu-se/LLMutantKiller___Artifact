let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.prototype.toTile', function(done) {
        // Test basic functionality with a known coordinate
        let point1 = new geo_point.GeoPoint(40.7128, -74.0060); // New York City
        let tile1 = point1.toTile(10);
        
        assert(tile1 !== null, 'toTile should return a non-null result');
        assert(typeof tile1 === 'object', 'toTile should return an object');
        assert(typeof tile1.x === 'number', 'tile should have numeric x coordinate');
        assert(typeof tile1.y === 'number', 'tile should have numeric y coordinate');
        assert(tile1.x >= 0, 'tile x coordinate should be non-negative');
        assert(tile1.y >= 0, 'tile y coordinate should be non-negative');
        
        // Test with different zoom levels
        let tile2 = point1.toTile(5);
        let tile3 = point1.toTile(15);
        
        assert(tile2.x !== tile3.x || tile2.y !== tile3.y, 'Different zoom levels should produce different tiles');
        
        // Test with equator coordinates
        let equatorPoint = new geo_point.GeoPoint(0, 0);
        let equatorTile = equatorPoint.toTile(1);
        
        assert(equatorTile !== null, 'toTile should work for equator coordinates');
        assert(typeof equatorTile.x === 'number', 'equator tile should have numeric x coordinate');
        assert(typeof equatorTile.y === 'number', 'equator tile should have numeric y coordinate');
        
        // Test with extreme coordinates
        let northPole = new geo_point.GeoPoint(85, 180);
        let northTile = northPole.toTile(8);
        
        assert(northTile !== null, 'toTile should work for extreme coordinates');
        
        // Test zoom level 0
        let zoomZeroTile = point1.toTile(0);
        assert(zoomZeroTile !== null, 'toTile should work for zoom level 0');
        
        done();
    });
    
    })