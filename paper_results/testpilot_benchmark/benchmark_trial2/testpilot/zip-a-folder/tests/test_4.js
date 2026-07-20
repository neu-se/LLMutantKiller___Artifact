let mocha = require('mocha');
let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let testDir;
    let srcFolder;
    let tarFilePath;

    beforeEach(function() {
        // Create a temporary directory for testing
        testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcFolder = path.join(testDir, 'source');
        tarFilePath = path.join(testDir, 'archive.tar.gz');
        
        // Create source folder with test files
        fs.mkdirSync(srcFolder);
        fs.writeFileSync(path.join(srcFolder, 'file1.txt'), 'Hello World');
        fs.writeFileSync(path.join(srcFolder, 'file2.txt'), 'Test Content');
        
        // Create a subdirectory with a file
        const subDir = path.join(srcFolder, 'subdir');
        fs.mkdirSync(subDir);
        fs.writeFileSync(path.join(subDir, 'file3.txt'), 'Nested Content');
    });

    afterEach(function() {
        // Clean up temporary directory
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    it('test zip-a-folder.ZipAFolder.tar with default compression', function(done) {
        zip_a_folder.ZipAFolder.tar(srcFolder, tarFilePath)
            .then(() => {
                // Verify the tar file was created
                assert(fs.existsSync(tarFilePath), 'Tar file should be created');
                assert(fs.statSync(tarFilePath).size > 0, 'Tar file should not be empty');
                done();
            })
            .catch(done);
    });

    })