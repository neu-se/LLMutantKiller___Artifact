import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should throw an error when trying to listen to an empty event', () => {
    const dirty = new Dirty('test.db');
    expect(() => dirty.once("", () => {})).toThrowError();
  });
});