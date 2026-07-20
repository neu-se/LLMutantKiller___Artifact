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

    // Write a chunk without a newline character to the file
    const chunk = '{"key":"testKey2","val":"testValue2"}';
    fs.appendFileSync(filePath, chunk);

    // Wait for the data to be loaded
    await new Promise(resolve => dirty.once('load', resolve));

    // Check if the data was loaded correctly
    expect(dirty.get(key)).toBe(value);
    expect(dirty.get('testKey2')).toBeUndefined();

    // Clean up
    await fs.promises.rm(tempDir, { recursive: true });
  });
});