import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should not close the write stream when it does not exist', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    await new Promise(resolve => dirty.once('load', resolve));
    dirty.set('key', 'value');
    await new Promise(resolve => dirty.once('drain', resolve));
    dirty._writeStream = null;
    dirty.close();
    await new Promise((resolve, reject) => {
      dirty.once('write_close', () => reject('Write stream closed unexpectedly'));
      setTimeout(resolve, 100);
    });
  });
});