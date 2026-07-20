import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promises as fsp } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should close the database when the drain event is emitted', async () => {
    const filePath = join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);
    db.set('key', 'value');
    await new Promise((resolve) => {
      db.on('drain', () => {
        db.close();
        resolve();
      });
    });
    await new Promise((resolve) => {
      db.on('write_close', () => {
        resolve();
      });
    });
    await fsp.access(filePath).then(() => {
      throw new Error('File was not closed');
    }).catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    });
    rimraf.sync(filePath);
  });
});