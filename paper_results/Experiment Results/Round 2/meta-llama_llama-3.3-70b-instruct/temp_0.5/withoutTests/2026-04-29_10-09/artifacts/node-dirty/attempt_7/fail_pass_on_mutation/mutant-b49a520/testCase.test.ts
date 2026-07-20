import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should handle chunk without newline correctly', async () => {
    const tempDir = 'temp';
    const filePath = path.join(tempDir, 'test.db');
    await fs.promises.mkdir(tempDir, { recursive: true });
    const dirty = new Dirty(filePath);
    const key1 = 'testKey1';
    const value1 = 'testValue1';
    const key2 = 'testKey2';
    const value2 = 'testValue2';

    dirty.set(key1, value1);
    dirty.set(key2, value2);

    // Wait for the data to be written to the file
    await new Promise(resolve => dirty.once('drain', resolve));

    // Read the file and verify its contents
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const lines = fileContents.split('\n');
    expect(lines.length).toBe(3); // two data lines and an empty line at the end
    expect(JSON.parse(lines[0]).key).toBe(key1);
    expect(JSON.parse(lines[0]).val).toBe(value1);
    expect(JSON.parse(lines[1]).key).toBe(key2);
    expect(JSON.parse(lines[1]).val).toBe(value2);

    // Clean up
    await fs.promises.rm(tempDir, { recursive: true });
  });
});