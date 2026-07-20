import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not load a corrupted row without a key', async () => {
    const tempDir = 'tempDir';
    const filePath = `${tempDir}/test.db`;

    // Create a temporary directory and file
    try {
      fs.mkdirSync(tempDir, { recursive: true });
    } catch (e) {
      // Directory already exists
    }
    fs.writeFileSync(filePath, '{"val": "test"}\n');

    const dirty = new Dirty(filePath);

    let errorEmitted = false;
    dirty.on('error', () => {
      errorEmitted = true;
    });

    // Wait for the 'load' event
    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve(true);
      });
    });

    // Check if an error is emitted
    expect(errorEmitted).toBe(true);

    // Check if the size of the dirty object is 0
    expect(dirty.size()).toBe(0);

    // Clean up
    fs.rmdirSync(tempDir, { recursive: true });
  });
});