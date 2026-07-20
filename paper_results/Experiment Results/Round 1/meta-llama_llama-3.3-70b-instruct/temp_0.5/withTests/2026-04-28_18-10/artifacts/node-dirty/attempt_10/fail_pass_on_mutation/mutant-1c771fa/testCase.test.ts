import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit an error with a message when a corrupted row is encountered', async () => {
    const filePath = 'test.dirty';
    await fs.writeFile(filePath, '{"key":"x","val":"y"}\n{"key":"p"');

    const db = new Dirty(filePath);
    let errorEmitted = false;
    let errorMessage = '';
    db.on('error', (err) => {
      errorEmitted = true;
      errorMessage = err.message;
    });

    await new Promise((resolve) => {
      db.on('load', () => {
        resolve();
      });
    });

    expect(errorEmitted).toBe(true);
    expect(errorMessage).not.toBe('');

    await fs.unlink(filePath);
  });
});