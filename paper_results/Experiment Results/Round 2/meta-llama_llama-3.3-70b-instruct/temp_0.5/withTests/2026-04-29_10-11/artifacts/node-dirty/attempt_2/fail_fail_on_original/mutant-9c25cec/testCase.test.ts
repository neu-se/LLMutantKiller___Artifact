import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should throw an error when loading a corrupted row without a key', async () => {
    const filePath = 'test.dirty';
    const dirty = new Dirty(filePath);

    fs.writeFileSync(filePath, '{"val":"value"}\n');

    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    expect(() => {
      dirty.get('key');
    }).not.toThrow();

    fs.unlinkSync(filePath);
  });
});