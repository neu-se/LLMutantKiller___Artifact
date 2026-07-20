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

    it('should create tar file from folder with single file', async function() {
        // Create test file
        const testFile = path.join(testFolder, 'test.txt');
        fs.writeFileSync(testFile, 'Hello World');
        
        const tarPath = path.join(tempDir, 'output.tar');
        
        await zip_a_folder.ZipAFolder.tar(testFolder, tarPath);
        
        // Verify tar file was created
        assert(fs.existsSync(tarPath), 'Tar file should exist');
        assert(fs.statSync(tarPath).size > 0, 'Tar file should not be empty');
    });
});