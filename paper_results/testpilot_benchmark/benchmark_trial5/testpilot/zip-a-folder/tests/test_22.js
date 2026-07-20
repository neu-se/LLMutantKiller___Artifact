let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let testDir;
    let zipPath;
    
    beforeEach(function() {
        // Create a temporary directory for testing
        testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        zipPath = path.join(testDir, 'test.zip');
        
        // Create test folder structure
        const sourceDir = path.join(testDir, 'source');
        fs.mkdirSync(sourceDir);
        fs.writeFileSync(path.join(sourceDir, 'file1.txt'), 'Hello World');
        fs.writeFileSync(path.join(sourceDir, 'file2.txt'), 'Test Content');
        
        const subDir = path.join(sourceDir, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'nested.txt'), 'Nested file content');
    });
    
    afterEach(function() {
        // Clean up test files
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    it('should zip a folder successfully', function(done) {
        const zipper = new zip_a_folder.ZipAFolder();
        const sourceDir = path.join(testDir, 'source');
        
        zipper.zip(sourceDir, zipPath)
            .then(() => {
                // Verify zip file was created
                assert(fs.existsSync(zipPath));
                assert(fs.statSync(zipPath).size > 0);
                done();
            })
            .catch(done);
    });
});