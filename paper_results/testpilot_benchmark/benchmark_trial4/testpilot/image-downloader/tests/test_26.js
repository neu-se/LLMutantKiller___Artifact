let assert = require('assert');
let image_downloader = require('image-downloader');
let fs = require('fs');
let path = require('path');
let http = require('http');

describe('test image_downloader', function() {
    let server;
    let testImageBuffer;
    
    before(function(done) {
        // Create a simple test image buffer (1x1 PNG)
        testImageBuffer = Buffer.from([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
            0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
            0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
            0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
            0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
            0x54, 0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00,
            0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01,
            0xE2, 0x21, 0xBC, 0x33, 0x00, 0x00, 0x00, 0x00,
            0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
        ]);
        
        // Create a mock HTTP server
        server = http.createServer((req, res) => {
            if (req.url === '/test-image.png') {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(testImageBuffer);
            } else {
                res.writeHead(404);
                res.end('Not found');
            }
        });
        
        server.listen(3000, done);
    });
    
    after(function(done) {
        server.close(done);
    });
    
    afterEach(function() {
        // Clean up any test files
        const testFiles = ['test-image.png', 'custom-name.png'];
        testFiles.forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        });
    });

    it('should work with empty options object', function(done) {
        // This test assumes the function can handle missing required options
        image_downloader.image({})
            .then(() => {
                done(new Error('Should have thrown an error for missing options'));
            })
            .catch((error) => {
                assert(error, 'Should throw an error for missing required options');
                done();
            });
    });

});