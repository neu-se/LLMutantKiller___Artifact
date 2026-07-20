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
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should zip an empty folder', async function() {
        // Test zipping an empty folder
        await zip_a_folder.ZipAFolder.zip(testFolder, zipFilePath);
        
        // Verify zip file was created
        assert(fs.existsSync(zipFilePath), 'Zip file should be created');
        assert(fs.statSync(zipFilePath).size > 0, 'Zip file should not be empty');
    });

});