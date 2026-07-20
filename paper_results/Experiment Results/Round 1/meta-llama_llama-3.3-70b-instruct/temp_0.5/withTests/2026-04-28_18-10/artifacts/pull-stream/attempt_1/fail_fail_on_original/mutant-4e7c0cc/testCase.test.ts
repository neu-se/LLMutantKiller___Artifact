import { pull } from '../../../pull.js';

describe('pull', () => {
  it('should throw an error when the mutated code is used with 4 arguments', () => {
    expect(() => pull(
      (read) => read,
      (read) => read,
      (read) => read,
      (read) => read
    )).toThrowError();
  });
});