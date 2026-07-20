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

    it('should handle empty folder', async function() {
        const emptyFolder = path.join(tempDir, 'empty');
        fs.mkdirSync(emptyFolder);
        const emptyZipPath = path.join(tempDir, 'empty.zip');
        
        await zip_a_folder.ZipAFolder.zip(emptyFolder, emptyZipPath);
        
        assert(fs.existsSync(emptyZipPath), 'Zip file should be created even for empty folder');
    });
});