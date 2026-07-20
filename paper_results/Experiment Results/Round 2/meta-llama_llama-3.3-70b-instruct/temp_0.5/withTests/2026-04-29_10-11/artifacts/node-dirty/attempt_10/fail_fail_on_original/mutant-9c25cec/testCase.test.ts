import { Dirty } from '../../../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should throw an error when loading a corrupted row without a key', async () => {
    const dirty = new Dirty('test.dirty');
    const fileContent = '{"val":"value"}\n';
    require('fs').writeFileSync('test.dirty', fileContent);

    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    expect(dirty.get('key')).toBeUndefined();
    require('fs').unlinkSync('test.dirty');
  });
});