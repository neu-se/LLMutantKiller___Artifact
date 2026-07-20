```javascript
let mocha = require('mocha');
let assert = require('assert');
let path = require('path');
let sinon = require('sinon');

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
        image_downloader.image({ dest: '/path/to/dest' })
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch((err) => {
                assert.strictEqual(err.message, 'The options.url is required');
                done();
            });
    });

    it('should reject when dest is missing', function(done) {
        image_downloader.image({ url: 'http://example.com/image.jpg' })
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch((err) => {
                assert.strictEqual(err.message, 'The options.dest is required');
                done();
            });
    });

    it('should extract filename when dest is directory and extractFilename is true', function(done) {
        const options = {
            url: 'http://example.com/image.jpg',
            dest: '/path/to/dest'
        };
        
        image_downloader.image(options)
            .then(({ filename }) => {
                assert.strictEqual(filename, '/path/to/dest/image.jpg');
                done();
            })
            .catch(done);
    });

    it('should not extract filename when dest has extension', function(done) {
        const options = {
            url: 'http://example.com/image.jpg',
            dest: '/path/to/dest/photo.jpg'
        };
        
        image_downloader.image(options)
            .then(({ filename }) => {
                assert.strictEqual(filename, '/path/to/dest/photo.jpg');
                done();
            })
            .catch(done);
    });

    it('should not extract filename when extractFilename is false', function(done) {
        const options = {
            url: 'http://example.com/image.jpg',
            dest: '/path/to/dest/photo',
            extractFilename: false
        };
        
        image_downloader.image(options)
            .then(({ filename }) => {
                assert.strictEqual(filename, '/path/to/dest/photo');
                done();
            })
            .catch(done);
    });

    it('should decode URL-encoded filenames', function(done) {
        const options = {
            url: 'http://example.com/my%20image.jpg',
            dest: '/path/to/dest'
        };
        
        image_downloader.image(options)
            .then(({ filename }) => {
                assert.strictEqual(filename, '/path/to/dest/my image.jpg');
                done();
            })
            .catch(done);
    });

    it('should resolve relative paths to absolute paths', function(done) {
        const options = {
            url: