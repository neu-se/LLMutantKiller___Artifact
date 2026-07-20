let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test jsonfile', function() {
    let tempDir;
    let testFile;
    let testData;

    beforeEach(function() {
        // Create a temporary directory and file for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
        testFile = path.join(tempDir, 'test.json');
        testData = { name: 'John', age: 30, city: 'New York' };
        
        // Write test data to file
        fs.writeFileSync(testFile, JSON.stringify(testData));
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
        if (fs.existsSync(tempDir)) {
            fs.rmdirSync(tempDir);
        }
    });

    it('test jsonfile.readFile with callback', function(done) {
        jsonfile.readFile(testFile, function(err, obj) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(obj, testData);
            done();
        });
    });

    })