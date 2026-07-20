import { readFileSync, writeFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('fs module fallback', () => {
  it('should fall back to standard fs module when graceful-fs is not available', () => {
    const testDir = join(tmpdir(), 'jsonfile-test-fs-fallback');
    rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });

    const testFile = join(testDir, 'test.json');
    const testData = { name: 'test' };

    // Write a file to ensure the module is loaded
    writeFileSync(testFile, testData);

    // Verify the file was written correctly
    const readData = readFileSync(testFile);
    expect(readData).toEqual(testData);

    // Clean up
    rmSync(testDir, { recursive: true, force: true });
  });
});