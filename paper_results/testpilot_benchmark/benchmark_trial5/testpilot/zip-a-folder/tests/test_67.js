let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let testDir;
    let zipFilePath;

    beforeEach(function() {
        // Create a temporary directory for each test
        testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        zipFilePath = path.join(testDir, 'test.zip');
    });

    afterEach(function() {
        // Clean up temporary files and directories
        if (fs.existsSync(zipFilePath)) {
            fs.unlinkSync(zipFilePath);
        }
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    it('should throw error when source folder does not exist', async function() {
        const nonExistentFolder = path.join(testDir, 'nonexistent');

        try {
            await zip_a_folder.ZipAFolder.zip(nonExistentFolder, zipFilePath);
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert(error instanceof Error, 'Should throw an Error');
        }
    });
});