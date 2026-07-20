import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should close the db file streams after setting a value and waiting for drain', async () => {
    const dirty = new Dirty('test.db');
    dirty.set('key', 'value');
    await new Promise((resolve) => {
      dirty.on('drain', () => resolve());
    });
    dirty.close();
    await new Promise((resolve) => {
      dirty.on('write_close', () => resolve());
    });
    expect(dirty._writeStream).toBeNull();
  });
});