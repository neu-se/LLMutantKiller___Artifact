import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should throw an error when loading a corrupted row without a key', async () => {
    const tempDir = 'tempDir';
    const filePath = `${tempDir}/test.db`;

    // Create a temporary directory and file
    fs.mkdirSync(tempDir);
    fs.writeFileSync(filePath, '{"val": "test"}\n');

    const dirty = new Dirty(filePath);

    // Wait for the 'load' event
    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    // Check if an error was emitted
    let errorEmitted = false;
    dirty.on('error', () => {
      errorEmitted = true;
    });

    // Clean up
    rimraf.sync(tempDir);

    // Check if an error was emitted
    expect(errorEmitted).toBe(true);
  });
});