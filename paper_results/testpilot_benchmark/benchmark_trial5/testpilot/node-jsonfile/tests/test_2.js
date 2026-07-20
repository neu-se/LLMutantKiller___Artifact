let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test jsonfile', function() {
    let testFile;
    let testData;

    beforeEach(function() {
        // Create a temporary test file
        testFile = path.join(os.tmpdir(), `test-${Date.now()}-${Math.random()}.json`);
        testData = { name: 'test', value: 42, nested: { array: [1, 2, 3] } };
        fs.writeFileSync(testFile, JSON.stringify(testData));
    });

    afterEach(function() {
        // Clean up test file
        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
    });

    it('should read file with callback', function(done) {
        jsonfile.readFile(testFile, function(err, obj) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(obj, testData);
            done();
        });
    });

    })