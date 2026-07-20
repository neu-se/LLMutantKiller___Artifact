import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with null attributes', () => {
    const delta = new Delta().retain(1, null);
    const expected = new Delta().retain(1);
    expect(delta).toEqual(expected);
  });
});