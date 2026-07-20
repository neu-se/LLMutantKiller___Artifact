let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test jsonfile', function() {
    let tempDir;
    let testFilePath;
    
    beforeEach(function() {
        // Create a temporary directory for test files
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
        testFilePath = path.join(tempDir, 'test.json');
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

    it('should read a valid JSON file successfully', function(done) {
        const testData = { name: 'test', value: 42, array: [1, 2, 3] };
        
        // Create test file
        fs.writeFileSync(testFilePath, JSON.stringify(testData));
        
        jsonfile.readFile(testFilePath, function(err, data) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(data, testData);
            done();
        });
    });
    
    })