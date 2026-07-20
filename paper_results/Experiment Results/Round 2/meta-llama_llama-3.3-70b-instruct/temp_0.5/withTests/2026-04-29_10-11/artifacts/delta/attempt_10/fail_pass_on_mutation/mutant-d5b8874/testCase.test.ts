import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with mutated code', () => {
    const a = new Delta().retain(1, { embed: 1 });
    const b = new Delta().delete(1);
    const result = a.compose(b);
    expect(result.ops.length).toBe(1);
  });
});