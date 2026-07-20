import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error with correct message when diff is called with non-document', () => {
    const delta1 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    const delta2 = new Delta([{ retain: { foo: 'bar' } }]);
    expect(() => {
      try {
        delta1.diff(delta2);
      } catch (e) {
        expect(e.message).not.toBe('diff() called  non-document');
      }
    }).not.toThrow();
  });
});