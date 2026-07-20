let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile', function(done) {
        // Test case 1: London coordinates at zoom level 7
        const londonPoint = new geo_point.GeoPoint(51.5, -0.15);
        const londonTile = londonPoint.toTile(7);
        
        assert(typeof londonTile.x === 'number', 'x coordinate should be a number');
        assert(typeof londonTile.y === 'number', 'y coordinate should be a number');
        assert(londonTile.x >= 0, 'x coordinate should be non-negative');
        assert(londonTile.y >= 0, 'y coordinate should be non-negative');
        
        // Test case 2: Equator and Prime Meridian (0, 0) at zoom level 0
        const originPoint = new geo_point.GeoPoint(0, 0);
        const originTile = originPoint.toTile(0);
        
        assert.strictEqual(originTile.x, 0, 'Origin point should map to tile (0,0) at zoom 0');
        assert.strictEqual(originTile.y, 0, 'Origin point should map to tile (0,0) at zoom 0');
        
        // Test case 3: Different zoom levels should produce different results
        const testPoint = new geo_point.GeoPoint(40.7128, -74.0060); // New York
        const tile1 = testPoint.toTile(1);
        const tile5 = testPoint.toTile(5);
        const tile10 = testPoint.toTile(10);
        
        // Higher zoom levels should generally produce larger tile coordinates
        assert(tile10.x > tile5.x || tile10.y > tile5.y, 'Higher zoom should produce different coordinates');
        assert(tile5.x >= tile1.x && tile5.y >= tile1.y, 'Zoom 5 coordinates should be >= zoom 1');
        
        // Test case 4: Extreme coordinates
        const northPole = new geo_point.GeoPoint(85, 0); // Near max latitude
        const southPole = new geo_point.GeoPoint(-85, 0); // Near min latitude
        const eastExtreme = new geo_point.GeoPoint(0, 179);
        const westExtreme = new geo_point.GeoPoint(0, -179);
        
        const northTile = northPole.toTile(5);
        const southTile = southPole.toTile(5);
        const eastTile = eastExtreme.toTile(5);
        const westTile = westExtreme.toTile(5);
        
        assert(typeof northTile.x === 'number' && typeof northTile.y === 'number', 'North pole should produce valid tile');
        assert(typeof southTile.x === 'number' && typeof southTile.y === 'number', 'South pole should produce valid tile');
        assert(typeof eastTile.x === 'number' && typeof eastTile.y === 'number', 'East extreme should produce valid tile');
        assert(typeof westTile.x === 'number' && typeof westTile.y === 'number', 'West extreme should produce valid tile');
        
        done();
    });
    
    })