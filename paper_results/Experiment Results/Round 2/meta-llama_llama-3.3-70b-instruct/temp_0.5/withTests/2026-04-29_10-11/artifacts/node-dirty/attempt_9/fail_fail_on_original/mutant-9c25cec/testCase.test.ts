import { Dirty } from '../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should load a file with a key', async () => {
    const dirty = new Dirty('test.dirty');
    const fileContent = '{"key":"test","val":"value"}\n';
    require('fs').writeFileSync('test.dirty', fileContent);

    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve(true);
      });
    });

    expect(dirty.get('test')).toBe('value');
    require('fs').unlinkSync('test.dirty');
  });
});