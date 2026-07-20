The test:
```
let mocha = require('mocha');
let assert = require('assert');
let geo_point = require('geo-point');

describe('test geo_point', function() {
    it('test geo-point.GeoPoint.toTile', function(done) {
        // Test case 1: London coordinates at zoom level 10
        const london = new geo_point.GeoPoint(51.5074, -0.1278);
        const londonTile = london.toTile(london, 10);
        assert.strictEqual(londonTile.x, 511);
        assert.strictEqual(londonTile.y, 340);

        // Test case 2: New York coordinates at zoom level 12
        const newYork = new geo_point.GeoPoint(40.7128, -74.0060);
        const newYorkTile = newYork.toTile(newYork, 12);
        assert.strictEqual(newYorkTile.x, 1205);
        assert.strictEqual(newYorkTile.y, 1539);

        // Test case 3: Equator and Prime Meridian at zoom level 1
        const origin = new geo_point.GeoPoint(0, 0);
        const originTile = origin.toTile(origin, 1);
        assert.strictEqual(originTile.x, 1);
        assert.strictEqual(originTile.y, 1);

        // Test case 4: North pole area at zoom level 5
        const northPole = new geo_point.GeoPoint(85, 0);
        const northPoleTile = northPole.toTile(northPole, 5);
        assert.strictEqual(northPoleTile.x, 16);
        assert.strictEqual(northPoleTile.y, 0);

        // Test case 5: South pole area at zoom level 5
        const southPole = new geo_point.GeoPoint(-85, 0);
        const southPoleTile = southPole.toTile(southPole, 5);
        assert.strictEqual(southPoleTile.x, 16);
        assert.strictEqual(southPoleTile.y, 31);

        // Test case 6: International Date Line at zoom level 8
        const dateLine = new geo_point.GeoPoint(0, 180);
        const dateLineTile = dateLine.toTile(dateLine, 8);
        assert.strictEqual(dateLineTile.x, 0);
        assert.strictEqual(dateLineTile.y, 128);

        // Test case 7: Negative longitude at zoom level 6
        const negLon = new geo_point.GeoPoint(45, -90);
        const negLonTile = negLon.toTile(negLon, 6);
        assert.strictEqual(negLonTile.x, 16);
        assert.strictEqual(negLonTile.y, 22);

        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be strictly equal:

NaN !== 511
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.