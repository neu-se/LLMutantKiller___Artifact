import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with attributes', () => {
    const delta = new Delta().retain(1, { bold: true });
    const expected = new Delta().retain(1, { bold: true });
    expect(delta).toEqual(expected);
  });
});