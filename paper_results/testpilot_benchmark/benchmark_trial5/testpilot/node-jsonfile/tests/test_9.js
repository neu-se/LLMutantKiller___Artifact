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

    it('should write JSON file with callback', function(done) {
        const testData = { name: 'test', value: 42 };
        
        jsonfile.writeFile(testFile, testData, function(err) {
            assert.strictEqual(err, null);
            
            // Verify file was written correctly
            const writtenData = JSON.parse(fs.readFileSync(testFile, 'utf8'));
            assert.deepStrictEqual(writtenData, testData);
            done();
        });
    });

    })