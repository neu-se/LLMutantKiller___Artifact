import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it.skip('should throw an error when inserting an empty string', () => {
    const delta = new Delta();
    expect(() => delta.insert('')).toThrowError('cannot retain a string');
  });

  it('should not throw an error when inserting a non-empty string', () => {
    const delta = new Delta();
    expect(() => delta.insert('a')).not.toThrowError();
  });
});