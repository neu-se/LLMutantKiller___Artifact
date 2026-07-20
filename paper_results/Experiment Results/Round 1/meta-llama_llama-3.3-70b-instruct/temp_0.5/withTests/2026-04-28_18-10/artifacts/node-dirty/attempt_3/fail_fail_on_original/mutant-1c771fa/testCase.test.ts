import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit an error when a corrupted row is encountered and then emit load event with size 0', async () => {
    const filePath = 'test.dirty';
    await fs.writeFile(filePath, '{"key":"x","val":"y"}\n{"key":"p"');

    const db = new Dirty(filePath);
    let errorEmitted = false;
    let loadSize = 0;
    db.on('error', () => {
      errorEmitted = true;
    });
    db.on('load', (size) => {
      loadSize = size;
    });

    await new Promise((resolve) => {
      db.on('load', () => {
        resolve();
      });
    });

    expect(errorEmitted).toBe(true);
    expect(loadSize).toBe(0);

    await fs.unlink(filePath);
  });
});