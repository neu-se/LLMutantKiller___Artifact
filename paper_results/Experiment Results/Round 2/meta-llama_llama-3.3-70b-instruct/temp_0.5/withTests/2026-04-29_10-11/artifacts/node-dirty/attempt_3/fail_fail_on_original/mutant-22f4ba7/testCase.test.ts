import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { rimraf } from 'rimraf';

const unlink = promisify(fs.unlink);

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
    await new Promise((resolve, reject) => {
      fs.access(filePath, (err) => {
        if (err) {
          resolve();
        } else {
          reject(new Error('File was not closed'));
        }
      });
    });
  });
});