let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let testDir;
    let srcFolder;
    let targetFolder;

    beforeEach(async function() {
        // Create temporary directories for testing
        testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcFolder = path.join(testDir, 'source');
        targetFolder = path.join(testDir, 'target');
        
        fs.mkdirSync(srcFolder);
        fs.mkdirSync(targetFolder);
        
        // Create test files in source folder
        fs.writeFileSync(path.join(srcFolder, 'test1.txt'), 'Hello World');
        fs.writeFileSync(path.join(srcFolder, 'test2.txt'), 'Test content');
        
        // Create a subdirectory with a file
        const subDir = path.join(srcFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'nested.txt'), 'Nested file content');
    });

    afterEach(function() {
        // Clean up test directories
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    it('should throw error when source and target are the same', async function() {
        const zipPath = path.join(srcFolder, 'test.zip');
        
        try {
            await zip_a_folder.ZipAFolder.zip(srcFolder, zipPath);
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert(error.message.includes('Source and target folder must be different'), 
                   'Should throw error about same source and target folder');
        }
    });

});