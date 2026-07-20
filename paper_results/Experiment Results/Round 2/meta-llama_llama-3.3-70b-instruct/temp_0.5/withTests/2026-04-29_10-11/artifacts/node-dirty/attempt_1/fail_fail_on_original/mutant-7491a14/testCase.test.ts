import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const rimraf = promisify(require('rimraf'));

describe('Dirty', () => {
  it('should throw an error when reading a file without specifying the encoding', async () => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    await rimraf(tmpPath);
    await fs.promises.mkdir(tmpPath);

    try {
      const dirty = new Dirty(filePath);
      await new Promise((resolve) => dirty.on('load', resolve));
      await new Promise((resolve, reject) => {
        dirty.on('error', (err) => {
          if (err.code === 'ENOENT') {
            reject(new Error('File not found'));
          } else {
            reject(err);
          }
        });
      });
    } catch (err) {
      expect(err.code).toBe('ENOENT');
    } finally {
      await rimraf(tmpPath);
    }
  });
});