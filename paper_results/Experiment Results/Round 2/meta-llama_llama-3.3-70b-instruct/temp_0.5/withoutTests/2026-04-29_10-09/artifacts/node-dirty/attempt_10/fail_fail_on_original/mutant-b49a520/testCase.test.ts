import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should handle chunk without newline correctly', async () => {
    const tempDir = 'temp';
    const filePath = path.join(tempDir, 'test.db');
    await fs.promises.mkdir(tempDir, { recursive: true });
    const dirty = new Dirty(filePath);
    const key = 'testKey';
    const value = 'testValue';

    dirty.set(key, value);

    // Wait for the data to be written to the file
    await new Promise(resolve => dirty.once('drain', resolve));

    // Read the file and verify its contents
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const lines = fileContents.split('\n');

    // Write a chunk without a newline character to the file
    const chunk = '{"key":"testKey2","val":"testValue2"}';
    fs.appendFileSync(filePath, chunk);

    // Reload the data
    dirty._load();

    // Wait for the data to be loaded
    await new Promise(resolve => dirty.once('load', resolve));

    // Check if an error was emitted
    let errorEmitted = false;
    dirty.on('error', () => {
      errorEmitted = true;
    });

    // Check if the data was loaded correctly
    expect(errorEmitted).toBe(true);

    // Clean up
    await fs.promises.rm(tempDir, { recursive: true });
  });
});