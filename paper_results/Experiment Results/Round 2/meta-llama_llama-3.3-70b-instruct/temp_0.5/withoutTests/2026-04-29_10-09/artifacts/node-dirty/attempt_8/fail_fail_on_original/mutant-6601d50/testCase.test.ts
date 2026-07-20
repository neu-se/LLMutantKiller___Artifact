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
    const spy = jest.spyOn(dirty, 'once');
    dirty.emit('drain');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe('drain');
  });
});