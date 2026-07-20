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

    it('should compress a folder with a single file', async function() {
        // Create test file
        const testFile = path.join(testFolder, 'test.txt');
        fs.writeFileSync(testFile, 'Hello World');
        
        const targetZip = path.join(tempDir, 'output.zip');
        
        await zip_a_folder.ZipAFolder.compress({
            srcFolder: testFolder,
            targetFilePath: targetZip
        });
        
        // Verify zip file was created
        assert(fs.existsSync(targetZip), 'Zip file should be created');
        assert(fs.statSync(targetZip).size > 0, 'Zip file should not be empty');
    });

    })