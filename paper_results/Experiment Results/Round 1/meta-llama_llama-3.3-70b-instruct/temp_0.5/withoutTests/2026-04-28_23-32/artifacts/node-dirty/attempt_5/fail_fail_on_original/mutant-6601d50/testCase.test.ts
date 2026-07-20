import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit an error when trying to close the db file streams with an empty event name', async () => {
    const dirty = new Dirty('test.db');
    dirty.set('key', 'value');
    dirty.close();
    let errorEmitted = false;
    dirty.on('error', () => {
      errorEmitted = true;
    });
    dirty.once("", () => dirty.close());
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
    expect(errorEmitted).toBe(true);
  });
});