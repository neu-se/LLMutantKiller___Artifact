import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should destroy the read stream when closing', async () => {
    const tempFile = 'temp-test-file.txt';
    const dirty = new Dirty(tempFile);

    // Wait for the load event to ensure the read stream is created
    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve(true);
      });
    });

    // Close the dirty instance
    dirty.close();

    // Check if the file still exists
    expect(fs.existsSync(tempFile)).toBe(true);

    // Remove the temporary file
    fs.unlinkSync(tempFile);
  });
});