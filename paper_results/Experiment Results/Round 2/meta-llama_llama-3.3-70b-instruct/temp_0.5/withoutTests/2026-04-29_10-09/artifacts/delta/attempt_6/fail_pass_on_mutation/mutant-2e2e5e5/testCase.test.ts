import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error with correct message when diff is called with the same delta and another delta', () => {
    const delta1 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    const delta2 = new Delta([{ insert: 'Hello' }, { insert: 'Universe' }]);
    expect(() => delta1.diff(delta2)).not.toThrowError();
    const delta3 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    expect(() => delta1.diff(delta3)).not.toThrowError();
    const delta4 = new Delta([{ retain: { foo: 'bar' } }]);
    expect(() => delta1.diff(delta4)).toThrowError('diff() called on non-document');
    expect(() => delta1.diff(delta1)).not.toThrowError();
  });
});