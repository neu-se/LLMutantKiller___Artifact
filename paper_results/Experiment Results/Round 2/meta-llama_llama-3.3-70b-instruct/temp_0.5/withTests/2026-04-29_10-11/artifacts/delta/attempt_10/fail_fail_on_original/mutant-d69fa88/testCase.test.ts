import Delta from '../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain with an object', () => {
    const delta = new Delta().retain(1);
    const base = new Delta().insert({ embed: 1 });
    expect(() => delta.invert(base)).toThrowError('cannot retain a string');
  });
});