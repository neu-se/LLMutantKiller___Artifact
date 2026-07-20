import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('retain()', () => {
  it('retain(length) with length <= 0', () => {
    const delta = new Delta().retain(-1);
    expect(delta.ops.length).toEqual(0);
  });
});