let assert = require('assert');
let path = require('path');

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

    // Mock successful download
    return Promise.resolve({ filename: options.dest });
  }
};

describe('test image_downloader', function() {
    it('should reject when url is missing', function(done) {
        const options = {
            dest: '/path/to/dest'
        };
        
        image_downloader.image(options)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch((err) => {
                assert.strictEqual(err.message, 'The options.url is required');
                done();
            });
    });
});