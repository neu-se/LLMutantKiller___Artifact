import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should close the write stream after drain event when there are pending writes', async () => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    db.set('key', 'value');
    db.set('key2', 'value2');
    db.on('drain', () => {
      db.close();
    });
    await new Promise((resolve) => {
      db.on('write_close', () => {
        resolve(true);
      });
    });
    // Check if the write stream is still open
    const fd = fs.openSync(filePath, 'r');
    fs.closeSync(fd);
    const stats = fs.statSync(filePath);
    if (stats.size > 0) {
      // Pass
    } else {
      throw new Error('File was not written');
    }
  });
});