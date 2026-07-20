import { Dirty } from './dirty.js';

describe('Dirty', () => {
  it('should not end the write stream when _writeStream is null', async () => {
    const dirty = new Dirty(null);
    dirty.close();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(dirty._writeStream).toBeNull();
    dirty.close();
    expect(() => dirty._writeStream.end()).toThrowError();
  });
});