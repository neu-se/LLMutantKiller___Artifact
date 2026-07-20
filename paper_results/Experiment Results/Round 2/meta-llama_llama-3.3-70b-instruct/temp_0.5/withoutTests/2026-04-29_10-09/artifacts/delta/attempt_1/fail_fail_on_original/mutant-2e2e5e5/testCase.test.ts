import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when diff is called with non-document', () => {
    const delta1 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    const delta2 = new Delta([{ insert: 'Hello' }, { insert: 'Universe' }]);
    expect(() => delta1.diff(delta2)).not.toThrow();
    const delta3 = new Delta([{ retain: { foo: 'bar' } }]);
    expect(() => delta1.diff(delta3)).toThrowError('diff() called with non-document');
  });
});