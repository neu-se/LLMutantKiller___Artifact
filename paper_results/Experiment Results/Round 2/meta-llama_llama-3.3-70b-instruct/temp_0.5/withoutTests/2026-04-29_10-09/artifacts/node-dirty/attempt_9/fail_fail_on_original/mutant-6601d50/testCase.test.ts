import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should close the database file streams when there are no pending writes', async () => {
    const path = 'test.db';
    const dirty = new Dirty(path);
    dirty.set('key', 'value', () => {
      dirty.close();
    });
    await new Promise((resolve) => {
      dirty.once('drain', () => {
        resolve(true);
      });
    });
    dirty.close();
    await new Promise((resolve) => {
      dirty.once('write_close', () => {
        resolve(true);
      });
    });
    const closeSpy = jest.spyOn(dirty, 'close');
    dirty._queue.set('key', []);
    dirty.emit('drain');
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });
});