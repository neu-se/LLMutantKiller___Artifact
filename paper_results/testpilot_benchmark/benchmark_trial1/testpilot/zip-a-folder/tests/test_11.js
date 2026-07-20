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

    it('should compress a folder with multiple files and subdirectories', async function() {
        // Create test structure
        fs.writeFileSync(path.join(testFolder, 'file1.txt'), 'Content 1');
        fs.writeFileSync(path.join(testFolder, 'file2.txt'), 'Content 2');
        
        const subDir = path.join(testFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'nested.txt'), 'Nested content');
        
        const targetZip = path.join(tempDir, 'multi-file.zip');
        
        await zip_a_folder.ZipAFolder.compress({
            srcFolder: testFolder,
            targetFilePath: targetZip
        });
        
        assert(fs.existsSync(targetZip), 'Zip file should be created');
        assert(fs.statSync(targetZip).size > 0, 'Zip file should not be empty');
    });

    })