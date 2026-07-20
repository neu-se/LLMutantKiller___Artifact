import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('getEmbedTypeAndData function', () => {
  it.skip('should not throw an error when b is an object', () => {
    const a = { embed: 'test' };
    const b = { embed: 'test' };
    const delta = new Delta();
    const getEmbedTypeAndData = delta.constructor.prototype.getEmbedTypeAndData;
    expect(() => getEmbedTypeAndData.call(delta, a, b)).not.toThrowError();
  });

  it('should throw an error when b is not an object in the mutated code', () => {
    const a = { embed: 'test' };
    const b = 'test';
    const delta = new Delta();
    const getEmbedTypeAndData = delta.constructor.prototype.getEmbedTypeAndData;
    // In the mutated code, this should throw an error because the check for typeof b !== 'object' is removed
    expect(() => getEmbedTypeAndData.call(delta, a, b)).toThrowError();
  });
});