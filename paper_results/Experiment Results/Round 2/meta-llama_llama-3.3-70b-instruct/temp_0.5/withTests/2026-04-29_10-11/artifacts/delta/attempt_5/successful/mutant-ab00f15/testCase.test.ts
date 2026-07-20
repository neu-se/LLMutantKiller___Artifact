import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('retain()', () => {
  it('retain(length) with length that is not a number', () => {
    const delta = new Delta().retain(null);
    expect(delta.ops.length).toEqual(1);
  });
});