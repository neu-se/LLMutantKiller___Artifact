import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() with embeds', () => {
  it('retain an embed with a number', () => {
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert({ embed: 1 }, { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});