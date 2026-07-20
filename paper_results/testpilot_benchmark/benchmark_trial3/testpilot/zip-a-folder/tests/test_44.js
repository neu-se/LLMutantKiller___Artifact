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

    it('should throw error for non-existent source folder', async function() {
        const nonExistentFolder = path.join(testDir, 'does-not-exist');
        
        try {
            await zip_a_folder.ZipAFolder.tar(nonExistentFolder, tarFilePath);
            assert.fail('Should have thrown an error for non-existent folder');
        } catch (error) {
            assert(error instanceof Error, 'Should throw an Error object');
        }
    });

});