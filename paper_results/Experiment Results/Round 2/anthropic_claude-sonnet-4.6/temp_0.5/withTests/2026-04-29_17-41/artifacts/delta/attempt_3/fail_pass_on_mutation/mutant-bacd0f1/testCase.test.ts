import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain with number in this and embed in other preserves embed', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({ image: 'http://example.com' });
    const expected = new Delta().retain({ image: 'http://example.com' });
    expect(a.transform(b, false)).toEqual(expected);
  });
});