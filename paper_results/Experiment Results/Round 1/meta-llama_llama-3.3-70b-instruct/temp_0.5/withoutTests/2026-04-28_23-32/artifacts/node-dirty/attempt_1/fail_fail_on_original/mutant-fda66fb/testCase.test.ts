import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';
import { mkdir, writeFile } from 'fs/promises';

describe('Dirty', () => {
  it('should not close write stream when queue is not empty', async () => {
    const tempDir = 'temp-dir';
    await mkdir(tempDir);
    const filePath = `${tempDir}/test.db`;
    const dirty = new Dirty(filePath);

    dirty.set('key', 'value', () => {
      // do nothing
    });

    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve();
      });
    });

    const writeStreamClosed = new Promise((resolve) => {
      dirty.once('write_close', () => {
        resolve();
      });
    });

    dirty.close();

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    await expect(writeStreamClosed).rejects.toThrow();

    await rimraf(tempDir);
  });
});