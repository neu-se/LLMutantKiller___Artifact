import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit an error when a corrupted row is encountered and not load the corrupted row', async () => {
    const filePath = 'test.dirty';
    await fs.writeFile(filePath, '{"key":"x","val":"y"}\n{"key":"p"');

    const db = new Dirty(filePath);
    let errorEmitted = false;
    db.on('error', () => {
      errorEmitted = true;
    });

    await new Promise((resolve) => {
      db.on('load', () => {
        resolve();
      });
    });

    expect(errorEmitted).toBe(true);
    expect(db.size()).toBe(1);

    await fs.unlink(filePath);
  });
});