let mocha = require('mocha');
let assert = require('assert');
let image_downloader = require('image-downloader');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test image_downloader', function() {
    let tempDir;
    
    beforeEach(function() {
        // Create a temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'image-downloader-test-'));
    });
    
    afterEach(function() {
        // Clean up temporary directory after each test
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should download image with extractFilename=true (default)', function(done) {
        // Mock a simple image URL that returns a small image
        const options = {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            dest: tempDir
        };
        
        image_downloader.image(options)
            .then(({ filename }) => {
                assert(fs.existsSync(filename), 'File should exist');
                assert(filename.includes(tempDir), 'File should be in temp directory');
                done();
            })
            .catch(done);
    });

    })