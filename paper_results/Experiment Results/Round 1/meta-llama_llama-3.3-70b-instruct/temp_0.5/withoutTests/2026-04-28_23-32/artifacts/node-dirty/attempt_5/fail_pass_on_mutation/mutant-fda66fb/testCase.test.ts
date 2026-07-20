import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { mkdir, writeFile } from 'fs/promises';

describe('Dirty', () => {
  it('should not close write stream when queue is empty', async () => {
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

    await new Promise<void>((resolve) => {
      dirty.once('load', () => {
        resolve();
      });
    });

    dirty.close();

    await new Promise<void>((resolve) => {
      dirty.once('write_close', () => {
        resolve();
      });
    });
  });
});