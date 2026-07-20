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
        // Create a temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
        testFilePath = path.join(tempDir, 'test.json');
    });

    afterEach(function() {
        // Clean up temporary files
        try {
            if (fs.existsSync(testFilePath)) {
                fs.unlinkSync(testFilePath);
            }
            fs.rmdirSync(tempDir);
        } catch (err) {
            // Ignore cleanup errors
        }
    });

    it('should write a simple object to file', function(done) {
        const testData = { name: 'John', age: 30 };
        
        jsonfile.writeFile(testFilePath, testData, function(err) {
            assert.strictEqual(err, null);
            
            // Verify the file was created and contains correct data
            const writtenData = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
            assert.deepStrictEqual(writtenData, testData);
            done();
        });
    });

    })