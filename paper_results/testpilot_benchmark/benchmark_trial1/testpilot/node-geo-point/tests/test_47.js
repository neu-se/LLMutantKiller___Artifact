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
        
        assert(tile2.x !== tile3.x || tile2.y !== tile3.y, 'different zoom levels should produce different tiles');
        
        // Test with equator coordinates
        let point2 = new geo_point.GeoPoint(0, 0);
        let tile4 = point2.toTile(1);
        
        assert(tile4 !== null, 'toTile should work with equator coordinates');
        assert(typeof tile4.x === 'number', 'equator tile should have numeric x coordinate');
        assert(typeof tile4.y === 'number', 'equator tile should have numeric y coordinate');
        
        // Test with extreme coordinates
        let point3 = new geo_point.GeoPoint(85, 180);
        let tile5 = point3.toTile(8);
        
        assert(tile5 !== null, 'toTile should work with extreme coordinates');
        assert(tile5.x >= 0, 'extreme coordinate tile x should be non-negative');
        assert(tile5.y >= 0, 'extreme coordinate tile y should be non-negative');
        
        done();
    });
    
    })