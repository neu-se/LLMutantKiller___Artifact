import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('optimization condition', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const c = new Delta().retain(1);
    const result = a.compose(b).compose(c);
    const expected = new Delta().insert('A');
    expect(result.ops.length).toBe(1);
  });
});