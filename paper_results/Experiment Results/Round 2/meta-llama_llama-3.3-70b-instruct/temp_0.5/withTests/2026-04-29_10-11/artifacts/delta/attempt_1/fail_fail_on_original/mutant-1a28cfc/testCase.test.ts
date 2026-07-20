import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('getEmbedTypeAndData function', () => {
  it('should throw an error when b is not an object', () => {
    const a = { embed: 'test' };
    const b = 'test';
    expect(() => Delta.getEmbedTypeAndData(a, b)).toThrowError('cannot retain a string');
  });
});