let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let tempDir;
    let testFolder;
    let zipFilePath;

    beforeEach(function() {
        // Create temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        testFolder = path.join(tempDir, 'test-folder');
        zipFilePath = path.join(tempDir, 'test.zip');
        
        // Create test folder structure
        fs.mkdirSync(testFolder);
        fs.writeFileSync(path.join(testFolder, 'file1.txt'), 'Hello World');
        fs.writeFileSync(path.join(testFolder, 'file2.txt'), 'Test Content');
        
        // Create subdirectory
        const subDir = path.join(testFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'file3.txt'), 'Subdirectory file');
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should zip folder with default compression', async function() {
        await zip_a_folder.ZipAFolder.zip(testFolder, zipFilePath);
        
        // Verify zip file was created
        assert(fs.existsSync(zipFilePath), 'Zip file should exist');
        
        // Verify zip file has content (size > 0)
        const stats = fs.statSync(zipFilePath);
        assert(stats.size > 0, 'Zip file should not be empty');
    });
});