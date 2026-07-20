let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test jsonfile', function() {
    let testFile;
    let testData = { name: 'test', value: 42, nested: { array: [1, 2, 3] } };

    beforeEach(function() {
        // Create a temporary test file
        testFile = path.join(os.tmpdir(), `test-${Date.now()}-${Math.random()}.json`);
        fs.writeFileSync(testFile, JSON.stringify(testData));
    });

    afterEach(function() {
        // Clean up test file
        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
    });

    it('test jsonfile.readFile with callback', function(done) {
        jsonfile.readFile(testFile, function(err, data) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(data, testData);
            done();
        });
    });

    })