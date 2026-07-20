let mocha = require('mocha');
let assert = require('assert');
let path = require('path');
let fs = require('fs');
let os = require('os');

// Mock the image-downloader module
let image_downloader = {
    image: ({ extractFilename = true, ...options } = {}) => {
        if (!options.url) {
            return Promise.reject(new Error('The options.url is required'));
        }

        if (!options.dest) {
            return Promise.reject(new Error('The options.dest is required'));
        }

        if (extractFilename) {
            if (!path.extname(options.dest)) {
                const url = new URL(options.url);
                const pathname = url.pathname;
                const basename = path.basename(pathname);
                const decodedBasename = decodeURIComponent(basename);

                options.dest = path.join(options.dest, decodedBasename);
            }
        }

        if (!path.isAbsolute(options.dest)) {
            options.dest = path.resolve(__dirname, options.dest);
        }

        // Mock request function - just resolve with the final options
        return Promise.resolve({ dest: options.dest, url: options.url });
    }
};

describe('test image_downloader', function() {
    let tempDir;

    beforeEach(function() {
        // Create a temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'image-downloader-test-'));
    });

    afterEach(function() {
        // Clean up temporary directory
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should reject when dest is missing', function(done) {
        image_downloader.image({ url: 'https://example.com/image.jpg' })
            .then(() => {
                done(new Error('Expected rejection but promise resolved'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'The options.dest is required');
                done();
            });
    });

    