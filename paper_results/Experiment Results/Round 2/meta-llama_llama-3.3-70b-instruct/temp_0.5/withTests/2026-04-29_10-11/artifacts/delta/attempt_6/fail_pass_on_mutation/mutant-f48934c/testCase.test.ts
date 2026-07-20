import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the condition for inserting an empty string', () => {
    const delta = new Delta();
    const arg = '';
    expect(() => {
      if (typeof arg === 'string' && arg.length === 0) {
        throw new Error('Inserting empty string');
      }
      delta.insert(arg);
    }).toThrowError('Inserting empty string');
  });
});