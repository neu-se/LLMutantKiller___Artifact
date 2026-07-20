let mocha = require('mocha');
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

    it('should throw error when source and target are in same directory', async function() {
        const invalidTargetPath = path.join(srcFolder, 'output.zip');
        
        try {
            await zip_a_folder.ZipAFolder.compress({
                srcFolder: srcFolder,
                targetFilePath: invalidTargetPath,
                format: 'zip'
            });
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert(error.message.includes('Source and target folder must be different'));
        }
    });

    })