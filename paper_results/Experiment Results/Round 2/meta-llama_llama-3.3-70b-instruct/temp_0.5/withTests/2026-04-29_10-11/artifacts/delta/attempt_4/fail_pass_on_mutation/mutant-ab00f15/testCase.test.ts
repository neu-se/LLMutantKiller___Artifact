import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('retain()', () => {
  it('retain(length) with non-numeric length', () => {
    const delta = new Delta().retain('a' as any);
    expect(delta.ops.length).toEqual(1);
  });
});