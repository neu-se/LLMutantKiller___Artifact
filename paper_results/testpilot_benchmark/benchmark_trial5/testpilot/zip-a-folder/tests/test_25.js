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

    it('should create tar file from folder with multiple files', async function() {
        // Create multiple test files
        fs.writeFileSync(path.join(testFolder, 'file1.txt'), 'Content 1');
        fs.writeFileSync(path.join(testFolder, 'file2.txt'), 'Content 2');
        
        // Create subdirectory with file
        const subDir = path.join(testFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'file3.txt'), 'Content 3');
        
        const tarPath = path.join(tempDir, 'multi-file.tar');
        
        await zip_a_folder.ZipAFolder.tar(testFolder, tarPath);
        
        assert(fs.existsSync(tarPath), 'Tar file should exist');
        assert(fs.statSync(tarPath).size > 0, 'Tar file should not be empty');
    });

    })