let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test jsonfile', function() {
    let tempDir;
    
    beforeEach(function() {
        // Create a temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
    });
    
    afterEach(function() {
        // Clean up temporary directory after each test
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });
    
    it('should write JSON file with default options', function() {
        const file = path.join(tempDir, 'data.json');
        const obj = { name: 'JP' };
        
        jsonfile.writeFileSync(file, obj);
        
        assert(fs.existsSync(file), 'File should exist');
        const content = fs.readFileSync(file, 'utf8');
        const parsed = JSON.parse(content);
        assert.deepEqual(parsed, obj, 'File content should match original object');
    });
    
    })