import { Dirty } from '../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should load a file with a key and throw an error if key is missing', async () => {
    const dirty = new Dirty('test.dirty');
    const fileContent = '{"val":"value"}\n';
    require('fs').writeFileSync('test.dirty', fileContent);

    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    expect(() => dirty.get('key')).toThrowError();
    require('fs').unlinkSync('test.dirty');
  });
});