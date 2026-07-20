import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('getEmbedTypeAndData function', () => {
  it('should throw an error when the second argument is not an object', () => {
    const delta = new Delta();
    const a = { embed: 'test' };
    const b = 'test';
    const spy = jest.spyOn(delta, 'getEmbedTypeAndData');
    expect(() => spy(a, b)).toThrowError('cannot retain a string');
  });
});