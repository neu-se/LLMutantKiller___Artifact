import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with mutated code', () => {
    const a = new Delta().retain(1, { embed: 1 });
    const b = new Delta().delete(1);
    const expected = new Delta().delete(1);
    expect(a.compose(b)).not.toEqual(new Delta().push({ delete: 1 }));
  });
});