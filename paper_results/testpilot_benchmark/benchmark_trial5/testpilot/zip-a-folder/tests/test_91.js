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
        fs.writeFileSync(path.join(subDir, 'nested.txt'), 'Nested file content');
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should reject when source folder does not exist', async function() {
        const nonExistentFolder = path.join(tempDir, 'does-not-exist');
        
        try {
            await zip_a_folder.ZipAFolder.compress({
                srcFolder: nonExistentFolder,
                targetFilePath: zipFilePath
            });
            assert.fail('Should have thrown an error for non-existent folder');
        } catch (error) {
            assert(error instanceof Error, 'Should throw an Error object');
        }
    });
});