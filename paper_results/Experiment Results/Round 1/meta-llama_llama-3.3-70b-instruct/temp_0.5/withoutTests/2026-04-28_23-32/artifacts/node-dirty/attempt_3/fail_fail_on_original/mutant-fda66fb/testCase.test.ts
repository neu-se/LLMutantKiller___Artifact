import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { mkdir, writeFile } from 'fs/promises';

describe('Dirty', () => {
  it('should not close write stream when queue is not empty', async () => {
    const tempDir = 'temp-dir';
    try {
      await mkdir(tempDir);
    } catch (error) {
      if (error.code === 'EEXIST') {
        // Directory already exists, continue with the test
      } else {
        throw error;
      }
    }
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

    const writeStreamClosed = new Promise((resolve, reject) => {
      dirty.once('write_close', () => {
        reject(new Error('Write stream closed unexpectedly'));
      });
    });

    dirty.close();

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    await expect(writeStreamClosed).rejects.toThrowError('Write stream closed unexpectedly');
  });
});