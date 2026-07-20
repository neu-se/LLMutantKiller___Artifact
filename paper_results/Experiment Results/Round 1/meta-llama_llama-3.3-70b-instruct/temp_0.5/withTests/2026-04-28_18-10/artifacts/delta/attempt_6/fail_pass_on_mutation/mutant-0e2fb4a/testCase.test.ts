import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should invert a delta with a retain operation on an object', () => {
    const delta = new Delta().retain({ embed: 1 });
    const base = new Delta().insert('a');
    expect(() => delta.invert(base)).toThrowError('cannot retain a string');
  });
});