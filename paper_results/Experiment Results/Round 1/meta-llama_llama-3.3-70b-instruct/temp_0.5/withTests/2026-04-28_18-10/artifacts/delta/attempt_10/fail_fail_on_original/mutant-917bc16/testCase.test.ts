import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('optimization condition', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const c = new Delta().insert('B');
    const d = new Delta().retain(2);
    const result = a.compose(b).compose(c).compose(d);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].insert).toBe('AB');
  });
});