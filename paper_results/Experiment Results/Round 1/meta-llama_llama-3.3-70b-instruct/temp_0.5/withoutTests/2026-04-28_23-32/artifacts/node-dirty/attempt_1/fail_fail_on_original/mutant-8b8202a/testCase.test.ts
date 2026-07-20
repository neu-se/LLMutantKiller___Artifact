import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { rimraf } from 'rimraf';

const rm = promisify(rimraf);

describe('Dirty', () => {
  it('should emit drain event only when there are no in-flight writes', async () => {
    const dbPath = 'test-dirty.db';
    const dirty = new Dirty(dbPath);
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });

    dirty.set('key', 'value', () => {
      // do nothing
    });

    // Wait for the write to be processed
    await new Promise((resolve) => {
      dirty.on('write_close', resolve);
    });

    // Check if drain event was emitted
    expect(drainEmitted).toBe(false);

    // Close the dirty db
    dirty.close();

    // Wait for the close to complete
    await new Promise((resolve) => {
      dirty.on('read_close', resolve);
    });

    // Check if drain event was emitted after close
    expect(drainEmitted).toBe(true);

    // Clean up
    await rm(dbPath);
  });
});