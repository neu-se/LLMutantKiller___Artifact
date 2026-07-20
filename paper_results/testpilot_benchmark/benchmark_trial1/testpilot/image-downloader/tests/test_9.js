```javascript
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

    it('should download image with custom filename when dest includes filename', function(done) {
        const customFilename = 'custom-photo.png';
        const options = {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            dest: path.join(tempDir, customFilename)
        };
        
        image_downloader.image(options)
            .then(({ filename }) => {
                assert(fs.existsSync(filename), 'File should exist');
                assert(filename.endsWith(customFilename), 'File should have custom name');
                assert.strictEqual(filename, path.join(tempDir, customFilename));
                done();
            })
            .catch(done);
    });

    it('should download image with extractFilename=false', function(done) {
        const customPath = path.join(tempDir, 'photo');
        const options = {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            dest: customPath,
            extractFilename: false
        };
        
        image_downloader.image(options)
            .then(({ filename }) => {
                assert(fs.existsSync(filename), 'File should exist');
                assert.strictEqual(filename, customPath, 'File should be saved exactly as specified');
                done();
            })
            .catch(done);
    });

    it('should handle invalid URL gracefully', function(done) {
        const options = {
            url: 'invalid-url',
            dest: tempDir
        };
        
        image_downloader.image(options)
            .then(() => {
                done(new Error('Should have thrown an error for invalid URL'));
            })
            .catch((err) => {
                assert(err instanceof Error, 'Should throw an error');
                done();
            });
    });

    it('should handle missing dest parameter', function(