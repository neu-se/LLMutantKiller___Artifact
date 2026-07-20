import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('fs module fallback', () => {
  it('should fall back to standard fs module when graceful-fs throws an error', () => {
    // Create a test directory
    const testDir = join(tmpdir(), 'jsonfile-test-fs-fallback');
    rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });

    const testFile = join(testDir, 'test.json');
    const testData = { name: 'test' };

    // Write a test file using standard fs
    writeFileSync(testFile, JSON.stringify(testData));

    // Force graceful-fs to throw an error by passing an invalid fs module
    const result = readFileSync(testFile, {
      fs: {
        readFileSync: () => {
          throw new Error('Forced graceful-fs error');
        }
      }
    });

    // The original code should fall back to standard fs and read the file successfully
    expect(result).toEqual(testData);

    // Clean up
    rmSync(testDir, { recursive: true, force: true });
  });
});