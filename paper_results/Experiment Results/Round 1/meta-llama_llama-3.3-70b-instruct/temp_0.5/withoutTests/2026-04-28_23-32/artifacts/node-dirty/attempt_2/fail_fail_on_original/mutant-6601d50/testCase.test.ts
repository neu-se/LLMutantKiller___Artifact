import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit an error when trying to close the db file streams with an empty event name', () => {
    const dirty = new Dirty('test.db');
    dirty.close();
    expect(() => {
      dirty.once("", () => dirty.close());
    }).toThrowError();
  });
});