Your task is to write a test for the following function:
```
class zip-a-folder.ZipAFolder()
```

This function is defined as follows:
```
class ZipAFolder {
    static async tar(srcFolder, tarFilePath, zipAFolderOptions) {
        const o = zipAFolderOptions || {
            compression: COMPRESSION_LEVEL.high,
        };
        if (o.compression === COMPRESSION_LEVEL.uncompressed) {
            await ZipAFolder.compress({ srcFolder, targetFilePath: tarFilePath, format: 'tar', zipAFolderOptions });
        }
        else {
            await ZipAFolder.compress({
                srcFolder,
                targetFilePath: tarFilePath,
                format: 'tar',
                zipAFolderOptions,
                archiverOptions: {
                    gzip: true,
                    gzipOptions: {
                        level: o.compression,
                    },
                },
            });
        }
    }
    static async zip(srcFolder, zipFilePath, zipAFolderOptions) {
        const o = zipAFolderOptions || {
            compression: COMPRESSION_LEVEL.high,
        };
        if (o.compression === COMPRESSION_LEVEL.uncompressed) {
            await ZipAFolder.compress({
                srcFolder,
                targetFilePath: zipFilePath,
                format: 'zip',
                zipAFolderOptions,
                archiverOptions: {
                    store: true,
                },
            });
        }
        else {
            await ZipAFolder.compress({
                srcFolder,
                targetFilePath: zipFilePath,
                format: 'zip',
                zipAFolderOptions,
                archiverOptions: {
                    zlib: {
                        level: o.compression,
                    },
                },
            });
        }
    }
    static async compress({ srcFolder, targetFilePath, format, zipAFolderOptions, archiverOptions, }) {
        let output;
        if (!(zipAFolderOptions === null || zipAFolderOptions === void 0 ? void 0 : zipAFolderOptions.customWriteStream) && targetFilePath) {
            const targetBasePath = path.dirname(targetFilePath);
            if (targetBasePath === srcFolder) {
                throw new Error('Source and target folder must be different.');
            }
            try {
                await fs.promises.access(srcFolder, fs.constants.R_OK);
                await fs.promises.access(targetBasePath, fs.constants.R_OK | fs.constants.W_OK);
            }
            catch (e) {
                throw new Error(`Permission error: ${e.message}`);
            }
            output = fs.createWriteStream(targetFilePath);
        }
        else if (zipAFolderOptions && zipAFolderOptions.customWriteStream) {
            output = zipAFolderOptions === null || zipAFolderOptions === void 0 ? void 0 : zipAFolderOptions.customWriteStream;
        }
        else {
            throw new Error('You must either provide a target file path or a custom write stream to write to.');
        }
        const zipArchive = archiver(format, archiverOptions || {});
        return new Promise((resolve, reject) => {
            output.on('close', resolve);
            output.on('error', reject);
            zipArchive.pipe(output);
            zipArchive.directory(srcFolder, false);
            zipArchive.finalize();
        });
    }
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
describe('test zip_a_folder', function() {
    it('test zip-a-folder.ZipAFolder', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.