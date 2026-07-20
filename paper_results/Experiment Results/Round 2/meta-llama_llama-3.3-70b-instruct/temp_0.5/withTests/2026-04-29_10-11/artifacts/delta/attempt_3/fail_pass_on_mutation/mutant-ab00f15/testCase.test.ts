import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('retain()', () => {
  it('retain(length) with length <= 0', () => {
    const delta = new Delta().retain(0);
    expect(delta.ops.length).toEqual(0);
    const delta2 = new Delta().retain(-1);
    expect(delta2.ops.length).toEqual(0);
    const delta3 = new Delta().retain(1);
    expect(delta3.ops.length).toEqual(1);
  });
});