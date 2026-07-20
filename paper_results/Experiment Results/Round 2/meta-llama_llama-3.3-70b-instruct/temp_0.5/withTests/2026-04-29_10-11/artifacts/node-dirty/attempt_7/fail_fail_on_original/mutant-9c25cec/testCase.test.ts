import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should load a file with a key', async () => {
    const dirty = new Dirty('test.dirty');
    const fileContent = '{"key":"test","val":"value"}\n';
    fs.writeFileSync('test.dirty', fileContent);

    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve(true);
      });
    });

    expect(dirty.get('test')).toBe('value');
    fs.unlinkSync('test.dirty');
  });
});