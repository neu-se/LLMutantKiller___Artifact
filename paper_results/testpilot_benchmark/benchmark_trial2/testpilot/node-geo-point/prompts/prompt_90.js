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

        // Test case 3: Equator and Prime Meridian at zoom level 5
        const origin = new geo_point.GeoPoint(0, 0);
        const originTile = origin.toTile(origin, 5);
        assert.strictEqual(originTile.x, 16);
        assert.strictEqual(originTile.y, 16);

        // Test case 4: North pole edge case at zoom level 8
        const northPole = new geo_point.GeoPoint(85, 0);
        const northPoleTile = northPole.toTile(northPole, 8);
        assert.strictEqual(northPoleTile.x, 128);
        assert.strictEqual(northPoleTile.y, 0);

        // Test case 5: South pole edge case at zoom level 8
        const southPole = new geo_point.GeoPoint(-85, 0);
        const southPoleTile = southPole.toTile(southPole, 8);
        assert.strictEqual(southPoleTile.x, 128);
        assert.strictEqual(southPoleTile.y, 255);

        // Test case 6: International Date Line at zoom level 6
        const dateLine = new geo_point.GeoPoint(0, 180);
        const dateLineTile = dateLine.toTile(dateLine, 6);
        assert.strictEqual(dateLineTile.x, 64);
        assert.strictEqual(dateLineTile.y, 32);

        // Test case 7: Negative longitude at zoom level 7
        const negativeLon = new geo_point.GeoPoint(45, -90);
        const negativeLonTile = negativeLon.toTile(negativeLon, 7);
        assert.strictEqual(negativeLonTile.x, 32);
        assert.strictEqual(negativeLonTile.y, 45);

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