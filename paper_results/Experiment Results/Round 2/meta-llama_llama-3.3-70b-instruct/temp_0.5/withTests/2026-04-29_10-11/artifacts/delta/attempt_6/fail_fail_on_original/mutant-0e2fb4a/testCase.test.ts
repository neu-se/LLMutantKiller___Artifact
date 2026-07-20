import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a Delta with a retain operation on undefined', () => {
    const delta = new Delta().retain(undefined);
    const base = new Delta().insert('a');
    expect(() => delta.invert(base)).toThrowError('cannot retain a string');
  });
});