import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta transform', () => {
  it('should throw an error when otherData is null', () => {
    const delta1 = new Delta().retain(1, { test: 'value' });
    const delta2 = new Delta().retain(null);
    expect(() => delta1.transform(delta2)).toThrowError(
      'no handlers for embed type "undefined"'
    );
  });
});