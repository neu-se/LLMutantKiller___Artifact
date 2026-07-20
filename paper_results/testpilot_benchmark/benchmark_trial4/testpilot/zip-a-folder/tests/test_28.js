let mocha = require('mocha');
let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let testDir;
    let srcFolder;
    let tarFilePath;

    beforeEach(function() {
        // Create a temporary directory for each test
        testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcFolder = path.join(testDir, 'source');
        tarFilePath = path.join(testDir, 'output.tar');
        
        // Create source folder with test files
        fs.mkdirSync(srcFolder);
        fs.writeFileSync(path.join(srcFolder, 'file1.txt'), 'Hello World');
        fs.writeFileSync(path.join(srcFolder, 'file2.txt'), 'Test Content');
        
        // Create a subdirectory with a file
        const subDir = path.join(srcFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'nested.txt'), 'Nested file content');
    });

    afterEach(function() {
        // Clean up temporary directory
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    it('should create tar file in non-existent directory', async function() {
        const nestedTarPath = path.join(testDir, 'nested', 'dir', 'output.tar');
        
        await zip_a_folder.ZipAFolder.tar(srcFolder, nestedTarPath);
        
        // Verify tar file was created and directories were created
        assert(fs.existsSync(nestedTarPath), 'Tar file should exist in nested directory');
        
        const stats = fs.statSync(nestedTarPath);
        assert(stats.size > 0, 'Tar file should not be empty');
    });
});