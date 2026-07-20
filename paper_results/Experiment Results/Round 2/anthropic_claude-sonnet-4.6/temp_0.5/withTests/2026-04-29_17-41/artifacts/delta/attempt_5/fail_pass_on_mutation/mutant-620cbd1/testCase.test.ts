import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('produces correct result when other is only a plain retain covering all inserts in this', () => {
    // When `other` starts with (and consists entirely of) a plain number retain
    // that covers all inserts in `this`, the optimization pre-copies those inserts
    // and uses an early return via concat+chop. Without the optimization (mutation),
    // the retain is processed in the main loop instead, which should still work,
    // but the early-return path relies on the optimization having pre-seeded `ops`.
    // A plain retain-only `other` should return `this` unchanged (after chop).
    const a = new Delta()
      .insert('Hello', { bold: true })
      .insert(' World');
    const b = new Delta().retain(11);
    const expected = new Delta()
      .insert('Hello', { bold: true })
      .insert(' World');
    expect(a.compose(b)).toEqual(expected);
  });
});