let mocha = require('mocha');
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

    it('should zip a folder with options', async function() {
        // Create test folder structure
        const srcFolder = path.join(testDir, 'source');
        fs.mkdirSync(srcFolder);
        fs.writeFileSync(path.join(srcFolder, 'test.txt'), 'Hello World');

        const options = {
            compression: 'DEFLATE'
        };

        // Zip the folder with options
        await zip_a_folder.ZipAFolder.zip(srcFolder, zipFilePath, options);

        // Verify zip file was created
        assert(fs.existsSync(zipFilePath), 'Zip file should exist');
        assert(fs.statSync(zipFilePath).size > 0, 'Zip file should not be empty');
    });

    })