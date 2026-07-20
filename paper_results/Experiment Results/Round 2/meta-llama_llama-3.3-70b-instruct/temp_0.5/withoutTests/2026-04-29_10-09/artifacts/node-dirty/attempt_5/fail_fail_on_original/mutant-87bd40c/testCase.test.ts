import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should not throw an error when closing', async () => {
    const tempFile = 'temp-test-file.txt';
    const dirty = new Dirty(tempFile);

    // Wait for the load event to ensure the read stream is created
    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve(true);
      });
    });

    // Close the dirty instance
    expect(() => dirty.close()).not.toThrow();

    // Remove the temporary file
    fs.unlinkSync(tempFile);
  });
});