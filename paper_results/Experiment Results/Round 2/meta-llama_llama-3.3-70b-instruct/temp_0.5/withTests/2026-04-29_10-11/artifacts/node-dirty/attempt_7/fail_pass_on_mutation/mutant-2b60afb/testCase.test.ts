import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { unlink } from 'fs/promises';

const TMP_PATH = path.join(__dirname, 'tmp');
const FILE_NAME = 'test.dirty';
const FILE_PATH = path.join(TMP_PATH, FILE_NAME);

describe('Dirty', () => {
  it('should emit drain event after setting and removing multiple keys with callbacks', async () => {
    if (!fs.existsSync(TMP_PATH)) {
      fs.mkdirSync(TMP_PATH);
    }

    const db = new Dirty(FILE_PATH);
    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });
    let callbackCount = 0;
    db.set('foo', 'bar', () => {
      callbackCount++;
    });
    db.set('foo2', 'bar2', () => {
      callbackCount++;
    });
    db.set('foo3', 'bar3', () => {
      callbackCount++;
    });
    db.set('foo', undefined, () => {
      callbackCount++;
    });
    db.set('foo2', undefined, () => {
      callbackCount++;
    });
    db.set('foo3', undefined, () => {
      callbackCount++;
    });
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (drainCount < 1 || callbackCount < 6) {
          reject(new Error('Expected drain event to be emitted at least once and all callbacks to be called'));
        } else {
          resolve();
        }
      }, 100);
    });

    await unlink(FILE_PATH);
    if (fs.existsSync(TMP_PATH) && fs.readdirSync(TMP_PATH).length === 0) {
      fs.rmdirSync(TMP_PATH);
    }
  });
});