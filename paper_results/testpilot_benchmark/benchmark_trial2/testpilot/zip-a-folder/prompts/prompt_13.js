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

    it('should handle empty folder compression', async function() {
        const targetZip = path.join(tempDir, 'empty.zip');
        
        await zip_a_folder.ZipAFolder.compress({
            srcFolder: testFolder,
            targetFilePath: targetZip
        });
        
        assert(fs.existsSync(targetZip), 'Zip file should be created even for empty folder');
    });

    })
``` 
failed with the following error message:
```
create(undefined): format not registered  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.