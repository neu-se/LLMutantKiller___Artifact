import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error with correct message when diff is called with non-document', () => {
    const delta1 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    const delta2 = new Delta([{ insert: 'Hello' }, { insert: 'Universe' }]);
    const delta3 = new Delta([{ retain: { foo: 'bar' } }]);
    expect(() => delta1.diff(delta3)).toThrowError('diff() called on non-document');
    expect(() => delta1.diff(delta1)).toThrowError('diff() called on non-document');
  });
});