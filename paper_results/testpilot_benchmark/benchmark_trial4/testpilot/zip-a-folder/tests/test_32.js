let mocha = require('mocha');
let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let testDir;
    let srcFolder;
    
    beforeEach(function() {
        // Create a temporary directory for each test
        testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcFolder = path.join(testDir, 'source');
        fs.mkdirSync(srcFolder);
        
        // Create some test files
        fs.writeFileSync(path.join(srcFolder, 'file1.txt'), 'Hello World');
        fs.writeFileSync(path.join(srcFolder, 'file2.txt'), 'Test Content');
        
        // Create a subdirectory with a file
        const subDir = path.join(srcFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'nested.txt'), 'Nested file content');
    });
    
    afterEach(function() {
        // Clean up temporary directory
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    it('test zip-a-folder.ZipAFolder.tar with medium compression', async function() {
        const tarFilePath = path.join(testDir, 'output-medium.tar.gz');
        const options = { compression: zip_a_folder.COMPRESSION_LEVEL.medium };
        
        await zip_a_folder.ZipAFolder.tar(srcFolder, tarFilePath, options);
        
        // Verify the tar file was created
        assert(fs.existsSync(tarFilePath), 'Tar file should be created');
        
        const stats = fs.statSync(tarFilePath);
        assert(stats.size > 0, 'Tar file should have content');
    });

    })