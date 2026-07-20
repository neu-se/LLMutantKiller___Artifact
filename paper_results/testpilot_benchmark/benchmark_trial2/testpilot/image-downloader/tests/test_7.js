let mocha = require('mocha');
let assert = require('assert');
let path = require('path');

// Create a simple mock without sinon
let mockRequest = {
    callCount: 0,
    lastCall: null,
    resolveValue: { filename: 'test.jpg' },
    
    reset() {
        this.callCount = 0;
        this.lastCall = null;
    },
    
    resolves(value) {
        this.resolveValue = value;
    },
    
    // Mock function that returns a promise
    call(options) {
        this.callCount++;
        this.lastCall = options;
        return Promise.resolve(this.resolveValue);
    }
};

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

        return mockRequest.call(options);
    }
};

describe('test image_downloader', function() {
    beforeEach(function() {
        mockRequest.reset();
        mockRequest.resolves({ filename: 'test.jpg' });
    });

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
});