import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('retain()', () => {
  it('retain(length) with length <= 0', () => {
    const delta = new Delta().retain(0);
    expect(delta.ops.length).toEqual(0);
  });

  it('retain(length) with length > 0', () => {
    const delta = new Delta().retain(2);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 2 });
  });
});