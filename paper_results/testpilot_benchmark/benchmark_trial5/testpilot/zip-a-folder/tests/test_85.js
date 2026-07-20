let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let tempDir;
    let srcFolder;
    let targetFilePath;

    beforeEach(async function() {
        // Create temporary directory structure for testing
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcFolder = path.join(tempDir, 'source');
        targetFilePath = path.join(tempDir, 'output.zip');
        
        // Create source folder with test files
        fs.mkdirSync(srcFolder);
        fs.writeFileSync(path.join(srcFolder, 'test1.txt'), 'Hello World');
        fs.writeFileSync(path.join(srcFolder, 'test2.txt'), 'Test Content');
        
        // Create subdirectory with file
        const subDir = path.join(srcFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'nested.txt'), 'Nested file content');
    });

    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should work with archiver options', async function() {
        await zip_a_folder.ZipAFolder.compress({
            srcFolder: srcFolder,
            targetFilePath: targetFilePath,
            format: 'zip',
            archiverOptions: {
                zlib: { level: 9 }
            }
        });
        
        // Verify the zip file was created
        assert(fs.existsSync(targetFilePath), 'Zip file should be created');
        assert(fs.statSync(targetFilePath).size > 0, 'Zip file should not be empty');
    });
});