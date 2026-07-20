let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test jsonfile', function() {
    let tempDir;
    let testFiles = [];

    beforeEach(function() {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
    });

    afterEach(function() {
        // Clean up test files
        testFiles.forEach(file => {
            try {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            } catch (err) {
                // Ignore cleanup errors
            }
        });
        testFiles = [];
        
        // Clean up temp directory
        try {
            if (fs.existsSync(tempDir)) {
                fs.rmdirSync(tempDir);
            }
        } catch (err) {
            // Ignore cleanup errors
        }
    });

    it('should write JSON file with default options', function() {
        const file = path.join(tempDir, 'data1.json');
        testFiles.push(file);
        const obj = { name: 'JP' };
        
        jsonfile.writeFileSync(file, obj);
        
        assert(fs.existsSync(file), 'File should exist');
        const content = fs.readFileSync(file, 'utf8');
        const parsed = JSON.parse(content);
        assert.deepEqual(parsed, obj, 'File content should match original object');
    });

    })