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
    let closed = false;
    db.on('write_close', () => {
      closed = true;
    });
    await new Promise((resolve) => {
      db.on('drain', () => {
        db.close();
        resolve();
      });
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(closed).toBe(true);
        resolve();
      }, 100);
    });
    await unlink(filePath);
  });
});