let mocha = require('mocha');
let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let tempDir;
    let srcFolder;
    let zipFilePath;

    beforeEach(function() {
        // Create temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcFolder = path.join(tempDir, 'source');
        zipFilePath = path.join(tempDir, 'test.zip');
        
        // Create source folder with test files
        fs.mkdirSync(srcFolder);
        fs.writeFileSync(path.join(srcFolder, 'file1.txt'), 'Hello World');
        fs.writeFileSync(path.join(srcFolder, 'file2.txt'), 'Test Content');
        
        // Create subdirectory with file
        const subDir = path.join(srcFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'file3.txt'), 'Nested File');
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should zip folder with default high compression', async function() {
        await zip_a_folder.ZipAFolder.zip(srcFolder, zipFilePath);
        
        // Verify zip file was created
        assert(fs.existsSync(zipFilePath), 'Zip file should be created');
        
        // Verify zip file has content (size > 0)
        const stats = fs.statSync(zipFilePath);
        assert(stats.size > 0, 'Zip file should not be empty');
    });

    })