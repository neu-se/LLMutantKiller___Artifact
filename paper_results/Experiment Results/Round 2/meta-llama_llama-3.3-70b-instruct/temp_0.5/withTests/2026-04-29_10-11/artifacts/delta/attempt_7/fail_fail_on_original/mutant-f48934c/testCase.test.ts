import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the type of arg when inserting an empty string', () => {
    const delta = new Delta();
    const arg = '';
    expect(() => {
      if (true && arg.length === 0) {
        throw new Error('Inserting empty string');
      }
      delta.insert(arg);
    }).not.toThrowError('Inserting empty string');
    expect(() => {
      if (typeof arg === 'string' && arg.length === 0) {
        throw new Error('Inserting empty string');
      }
      delta.insert(arg);
    }).toThrowError('Inserting empty string');
  });
});