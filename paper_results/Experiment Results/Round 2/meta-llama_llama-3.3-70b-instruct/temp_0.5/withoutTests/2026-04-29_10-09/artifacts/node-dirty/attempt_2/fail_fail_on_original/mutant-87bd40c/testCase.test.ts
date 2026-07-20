import { Dirty } from '../../../lib/dirty/dirty.js';
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

    // Check if the read stream is not null
    expect(dirty._readStream).not.toBeNull();

    // Close the dirty instance
    dirty.close();

    // Wait for the read_close event to ensure the read stream is destroyed
    await new Promise((resolve) => {
      dirty.once('read_close', () => {
        resolve(true);
      });
    });

    // Check if the read stream is null after closing
    expect(dirty._readStream).toBeNull();

    // Remove the temporary file
    fs.unlinkSync(tempFile);
  });
});