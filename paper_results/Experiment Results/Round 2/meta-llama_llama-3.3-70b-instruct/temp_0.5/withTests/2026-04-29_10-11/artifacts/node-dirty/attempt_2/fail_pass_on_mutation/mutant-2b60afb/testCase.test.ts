import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { unlink } from 'fs/promises';

const TMP_PATH = path.join(__dirname, 'tmp');
const FILE_NAME = 'test.dirty';
const FILE_PATH = path.join(TMP_PATH, FILE_NAME);

describe('Dirty', () => {
  it('should emit drain event when queue is empty', async () => {
    if (!fs.existsSync(TMP_PATH)) {
      fs.mkdirSync(TMP_PATH);
    }

    const db = new Dirty(FILE_PATH);
    db.set('foo', 'bar');
    db.set('foo', undefined);
    await new Promise((resolve) => {
      db.on('drain', () => {
        resolve();
      });
    });

    await unlink(FILE_PATH);
    if (fs.existsSync(TMP_PATH) && fs.readdirSync(TMP_PATH).length === 0) {
      fs.rmdirSync(TMP_PATH);
    }
  });
});