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
        // Create temporary directory structure for testing
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
        fs.writeFileSync(path.join(subDir, 'file3.txt'), 'Subdirectory file');
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should zip folder with medium compression', async function() {
        const options = { compression: zip_a_folder.COMPRESSION_LEVEL.medium };
        await zip_a_folder.ZipAFolder.zip(srcFolder, zipFilePath, options);
        
        assert(fs.existsSync(zipFilePath), 'Zip file should be created');
        const stats = fs.statSync(zipFilePath);
        assert(stats.size > 0, 'Zip file should not be empty');
    });

});