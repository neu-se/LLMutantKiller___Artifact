import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with empty attributes', () => {
    const delta = new Delta().retain(1, {});
    const expected = new Delta().retain(1);
    expect(delta).toEqual(expected);
  });
});