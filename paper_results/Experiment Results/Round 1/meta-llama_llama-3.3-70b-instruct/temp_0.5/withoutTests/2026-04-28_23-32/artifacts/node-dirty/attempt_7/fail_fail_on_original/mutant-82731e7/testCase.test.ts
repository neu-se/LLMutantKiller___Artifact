import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should not end the write stream when _writeStream is null', async () => {
    const dirty = new Dirty(null);
    dirty.close();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(dirty._writeStream).toBeNull();
    const originalClose = dirty.close;
    dirty.close = () => {};
    dirty.close();
    expect(dirty.close).toBe(originalClose);
  });
});