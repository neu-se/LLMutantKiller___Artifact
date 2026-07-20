import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should load a file with a key', async () => {
    const filePath = 'test.dirty';
    const dirty = new Dirty(filePath);

    fs.writeFileSync(filePath, '{"key":"test","val":"value"}\n');

    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    expect(dirty.get('test')).toBe('value');

    fs.unlinkSync(filePath);
  });
});