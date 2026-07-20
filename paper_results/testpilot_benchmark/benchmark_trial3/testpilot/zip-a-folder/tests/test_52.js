let mocha = require('mocha');
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
        
        // Create subdirectory with file
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

    it('should create zip file in non-existent directory', async function() {
        const nestedZipPath = path.join(tempDir, 'nested', 'dir', 'test.zip');
        
        await zip_a_folder.ZipAFolder.zip(testFolder, nestedZipPath);
        
        assert(fs.existsSync(nestedZipPath), 'Zip file should be created in nested directory');
    });
});