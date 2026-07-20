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
        resolve();
      });
    });
    // Check if the write stream is still open
    const isFileOpen = fs.fstatSync(fs.openSync(filePath, 'r')).nlink > 0;
    if (isFileOpen) {
      throw new Error('File was not closed');
    }
  });
});