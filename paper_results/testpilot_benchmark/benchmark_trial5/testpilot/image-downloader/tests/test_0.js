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

describe('test image_downloader', function() {
    let tempDir;
    
    beforeEach(function() {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    });
    
    afterEach(function() {
        // Clean up temp files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    