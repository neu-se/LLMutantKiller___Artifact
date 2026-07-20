import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
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

    await writeFile(filePath, 'key:value\n');
    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve();
      });
    });

    dirty.close();
    await new Promise((resolve) => {
      dirty.once('write_close', () => {
        resolve();
      });
    });

    await mkdir('temp-dir2');
    const filePath2 = 'temp-dir2/test.db';
    const dirty2 = new Dirty(filePath2);
    dirty2.set('key', 'value', () => {
      // do nothing
    });
    await new Promise((resolve) => {
      dirty2.once('load', () => {
        resolve();
      });
    });

    const writeStreamClosed2 = new Promise((resolve, reject) => {
      dirty2.once('write_close', () => {
        reject(new Error('Write stream closed unexpectedly'));
      });
    });

    dirty2.close();

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    await expect(writeStreamClosed2).rejects.toThrowError('Write stream closed unexpectedly');
  });
});