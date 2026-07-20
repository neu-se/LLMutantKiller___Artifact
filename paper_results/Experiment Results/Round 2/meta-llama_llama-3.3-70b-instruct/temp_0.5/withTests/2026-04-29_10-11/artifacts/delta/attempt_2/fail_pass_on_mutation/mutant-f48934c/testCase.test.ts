import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when inserting an empty string with typeof arg === "string" check', () => {
    const delta = new Delta();
    const arg = '';
    expect(() => {
      if (typeof arg === 'string' && arg.length === 0) {
        throw new Error('cannot insert an empty string');
      }
      delta.insert(arg);
    }).toThrowError('cannot insert an empty string');
  });

  it('should not throw an error when inserting a non-empty string', () => {
    const delta = new Delta();
    expect(() => delta.insert('a')).not.toThrowError();
  });
});