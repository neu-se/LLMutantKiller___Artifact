import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { mkdir, writeFile } from 'fs/promises';

describe('Dirty', () => {
  it('should not close write stream when queue is not empty', async () => {
    const tempDir = 'temp-dir';
    try {
      await mkdir(tempDir);
    } catch (error: any) {
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

    await new Promise<void>((resolve) => {
      dirty.once('load', () => {
        resolve();
      });
    });

    let writeStreamClosed = false;
    dirty.once('write_close', () => {
      writeStreamClosed = true;
    });

    dirty.close();

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    expect(writeStreamClosed).toBe(true);

    dirty.set('key2', 'value2', () => {
      // do nothing
    });

    await new Promise<void>((resolve) => {
      dirty.once('write_close', () => {
        resolve();
      });
    });

    expect(writeStreamClosed).toBe(true);
  });
});