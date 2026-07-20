import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when thisData is null and otherData is an object in the mutated code', () => {
    const delta1 = new Delta().retain(null);
    const delta2 = new Delta().retain({ foo: 'bar' });
    expect(() => delta1.transform(delta2)).toThrowError('no handlers for embed type "undefined"');
  });
});