let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test jsonfile', function() {
    let tempDir;
    let testFile;

    beforeEach(function() {
        // Create a temporary directory for test files
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
        testFile = path.join(tempDir, 'test.json');
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
        fs.rmdirSync(tempDir);
    });

    it('should read valid JSON file successfully', function() {
        const testData = { name: 'John', age: 30, city: 'New York' };
        fs.writeFileSync(testFile, JSON.stringify(testData));
        
        const result = jsonfile.readFileSync(testFile);
        assert.deepEqual(result, testData);
    });

    })