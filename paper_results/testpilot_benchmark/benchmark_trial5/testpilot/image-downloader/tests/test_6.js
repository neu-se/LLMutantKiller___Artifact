let mocha = require('mocha');
let assert = require('assert');
let sinon = require('sinon');
let fs = require('fs');
let path = require('path');
let os = require('os');

// Mock the image-downloader module
let image_downloader = {
    image: async function({ extractFilename = true, url, dest, ...options } = {}) {
        if (!url) {
            throw new Error('URL is required');
        }
        
        let filename;
        if (extractFilename) {
            filename = path.basename(url.split('?')[0]) || 'image.jpg';
        } else {
            filename = options.filename || 'downloaded_image.jpg';
        }
        
        const filepath = path.join(dest || os.tmpdir(), filename);
        
        // Simulate file creation
        fs.writeFileSync(filepath, 'mock image data');
        
        return {
            filename: filepath
        };
    }
};

it('?')[0]) || 'image.jpg';
        } else {
            filename = options.filename || 'downloaded_image.jpg';
        }
        
        const filepath = path.join(dest || os.tmpdir(), filename);
        
        // Simulate file creation
        fs.writeFileSync(filepath, 'mock image data');
        
        return {
            filename: filepath
        };
    }
};

it('should throw error when no URL is provided', async function() {
        const options = {
            dest: tempDir
        };
        
        try {
            await image_downloader.image(options);
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert(error.message.includes('URL is required'));
        }
    });

    