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

    it('should write JSON file with callback', function(done) {
        const file = path.join(tempDir, 'data.json');
        const obj = { name: 'JP' };
        
        jsonfile.writeFile(file, obj, function(err) {
            if (err) return done(err);
            
            // Verify file was created and contains correct data
            const data = JSON.parse(fs.readFileSync(file, 'utf8'));
            assert.deepEqual(data, obj);
            done();
        });
    });

    })