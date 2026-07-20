import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import rimraf from 'rimraf';

const rm = promisify(rimraf);

describe('Dirty', () => {
  it('should emit an error when loading an empty line from the database', async () => {
    const dbPath = 'test.db';
    await fs.promises.writeFile(dbPath, '\n');
    const dirty = new Dirty(dbPath);
    let error: Error | null = null;
    dirty.on('error', (err) => {
      error = err;
    });
    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });
    expect(error).not.toBeNull();
    expect(error!.message).toBe('Empty lines never appear in a healthy database');
    await rm(dbPath);
  });
});