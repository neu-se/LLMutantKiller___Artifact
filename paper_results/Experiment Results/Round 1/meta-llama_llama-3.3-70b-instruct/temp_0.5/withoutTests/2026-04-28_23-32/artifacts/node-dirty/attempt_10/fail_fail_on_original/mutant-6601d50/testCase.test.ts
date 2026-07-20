import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should close the db file streams correctly when queue is not empty', async () => {
    const dirty = new Dirty('test.db');
    dirty.set('key', 'value');
    dirty.close();
    let writeCloseEmitted = false;
    dirty.on('write_close', () => {
      writeCloseEmitted = true;
    });
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
    expect(writeCloseEmitted).toBe(false);
  });
});