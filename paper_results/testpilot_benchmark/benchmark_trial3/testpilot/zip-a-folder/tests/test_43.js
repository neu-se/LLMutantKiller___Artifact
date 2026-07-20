let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let tempDir;
    let testFolder;
    let tarFilePath;

    beforeEach(function() {
        // Create temporary directory for testing
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        testFolder = path.join(tempDir, 'test-folder');
        tarFilePath = path.join(tempDir, 'test-archive.tgz');
        
        // Create test folder structure
        fs.mkdirSync(testFolder);
        fs.writeFileSync(path.join(testFolder, 'file1.txt'), 'Hello World');
        fs.writeFileSync(path.join(testFolder, 'file2.txt'), 'Test Content');
        
        // Create subdirectory
        const subDir = path.join(testFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'nested.txt'), 'Nested file content');
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should create tar archive from folder', function(done) {
        zip_a_folder.tar(testFolder, tarFilePath)
            .then(() => {
                // Verify tar file was created
                assert(fs.existsSync(tarFilePath), 'Tar file should exist');
                
                // Verify file size is greater than 0
                const stats = fs.statSync(tarFilePath);
                assert(stats.size > 0, 'Tar file should not be empty');
                
                done();
            })
            .catch(done);
    });
});