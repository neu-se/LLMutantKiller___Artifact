The test:
```
let mocha = require('mocha');
let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test zip_a_folder', function() {
    let tempDir;
    let testFolder;
    
    beforeEach(function() {
        // Create temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        testFolder = path.join(tempDir, 'test-folder');
        fs.mkdirSync(testFolder);
    });
    
    afterEach(function() {
        // Clean up temporary files
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should accept custom archiver options', async function() {
        fs.writeFileSync(path.join(testFolder, 'test.txt'), 'Test content for compression');
        
        const targetZip = path.join(tempDir, 'compressed.zip');
        
        await zip_a_folder.ZipAFolder.compress({
            srcFolder: testFolder,
            targetFilePath: targetZip,
            archiverOptions: {
                zlib: { level: 9 } // Maximum compression
            }
        });
        
        assert(fs.existsSync(targetZip), 'Zip file should be created with custom options');
        assert(fs.statSync(targetZip).size > 0, 'Zip file should not be empty');
    });

    })
``` 
failed with the following error message:
```
create(undefined): format not registered  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.