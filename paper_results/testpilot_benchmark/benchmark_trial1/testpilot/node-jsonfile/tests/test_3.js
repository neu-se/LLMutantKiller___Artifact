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
        // Create a temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
        testFile = path.join(tempDir, 'test.json');
    });
    
    afterEach(function() {
        // Clean up temporary files
        try {
            if (fs.existsSync(testFile)) {
                fs.unlinkSync(testFile);
            }
            fs.rmdirSync(tempDir);
        } catch (err) {
            // Ignore cleanup errors
        }
    });

    it('should read valid JSON file with callback', function(done) {
        const testData = { name: 'test', value: 123, array: [1, 2, 3] };
        
        // Create test file
        fs.writeFileSync(testFile, JSON.stringify(testData));
        
        jsonfile.readFile(testFile, function(err, obj) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(obj, testData);
            done();
        });
    });

    })