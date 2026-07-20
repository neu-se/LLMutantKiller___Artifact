let mocha = require('mocha');
let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let tempDir;
    let testFolder;
    
    beforeEach(function() {
        // Create temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        testFolder = path.join(tempDir, 'test-folder');
        fs.mkdirSync(testFolder);
    });
    
    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should throw error for non-existent source folder', async function() {
        const nonExistentFolder = path.join(tempDir, 'does-not-exist');
        const tarPath = path.join(tempDir, 'should-fail.tar');
        
        try {
            await zip_a_folder.ZipAFolder.tar(nonExistentFolder, tarPath);
            assert.fail('Should have thrown an error for non-existent folder');
        } catch (error) {
            assert(error instanceof Error, 'Should throw an Error object');
        }
    });
});