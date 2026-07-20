import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform when thisData is null and otherData is null', () => {
    const delta1 = new Delta().retain(1);
    const delta2 = new Delta().retain(null);
    expect(() => delta1.transform(delta2)).toThrowError('no handlers for embed type "undefined"');
  });
});