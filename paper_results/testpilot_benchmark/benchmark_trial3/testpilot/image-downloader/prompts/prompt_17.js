The test:
```
let mocha = require('mocha');
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
            } else if (req.url === '/image-without-extension') {
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
        // Clean up any created files
        const testFiles = ['test-image.png', 'custom-name.png', 'image-without-extension'];
        testFiles.forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        });
    });

    it('should download image with extractFilename explicitly set to true', function(done) {
        const options = {
            url: 'http://localhost:3000/test-image.png',
            dest: './',
            extractFilename: true
        };
        
        image_downloader.image(options)
            .then((result) => {
                assert(fs.existsSync('test-image.png'), 'Image file should be created');
                assert.strictEqual(result.filename, 'test-image.png');
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_1.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_1.js:1:13)
    at Module._compile (node:internal/modules/cjs/loader:1480:14)
    at Module.replacementCompile (/Users/anon/testpilot2/node_modules/append-transform/index.js:60:13)
    at Module._extensions..js (node:internal/modules/cjs/loader:1564:10)
    at Object.<anonymous> (/Users/anon/testpilot2/node_modules/append-transform/index.js:64:4)
    at Module.load (node:internal/modules/cjs/loader:1287:32)
    at Module._load (node:internal/modules/cjs/loader:1103:12)
    at cjsLoader (node:internal/modules/esm/translators:318:15)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:258:7)
    at ModuleJob.run (node:internal/modules/esm/module_job:262:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:474:24)
    at async formattedImport (/Users/anon/testpilot2/node_modules/mocha/lib/nodejs/esm-utils.js:7:14)
    at async exports.requireOrImport (/Users/anon/testpilot2/node_modules/mocha/lib/nodejs/esm-utils.js:38:28)
    at async exports.loadFilesAsync (/Users/anon/testpilot2/node_modules/mocha/lib/nodejs/esm-utils.js:91:20)
    at async singleRun (/Users/anon/testpilot2/node_modules/mocha/lib/cli/run-helpers.js:125:3)
    at async exports.handler (/Users/anon/testpilot2/node_modules/mocha/lib/cli/run.js:370:5)
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.