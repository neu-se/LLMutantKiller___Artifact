let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test jsonfile', function() {
    let tempDir;
    let testFilePath;
    let testData;

    beforeEach(function() {
        // Create a temporary directory and test file for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
        testFilePath = path.join(tempDir, 'test.json');
        testData = { name: 'test', value: 42, nested: { array: [1, 2, 3] } };
        fs.writeFileSync(testFilePath, JSON.stringify(testData));
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
        if (fs.existsSync(tempDir)) {
            fs.rmdirSync(tempDir);
        }
    });

    it('should read JSON file with callback', function(done) {
        jsonfile.readFile(testFilePath, function(err, data) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(data, testData);
            done();
        });
    });

    })