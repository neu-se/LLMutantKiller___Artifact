import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should load a file with a key', async () => {
    const dirty = new Dirty('test.dirty');

    const filePath = 'test.dirty';
    const fileContent = '{"key":"test","val":"value"}\n';

    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    expect(dirty.get('test')).toBe('value');
  });
});