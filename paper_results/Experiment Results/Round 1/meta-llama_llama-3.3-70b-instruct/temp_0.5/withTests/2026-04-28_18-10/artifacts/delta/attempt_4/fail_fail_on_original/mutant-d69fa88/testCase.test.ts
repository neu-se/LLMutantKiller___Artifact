import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should correctly handle the mutation in the invert method', () => {
    const delta = new Delta().retain('string');
    const base = new Delta().insert('a');
    expect(() => delta.invert(base)).toThrowError('cannot retain a string');
  });
});