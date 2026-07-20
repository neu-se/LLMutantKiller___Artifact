import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('preserves null attributes on insert ops remaining after other iterator exhausted', () => {
    // Build a delta with a retain followed by an insert with null attributes
    // The null attribute on the insert is meaningful (it removes an attribute)
    // When composing with a shorter retain, the optimization should fire and
    // preserve the null attribute via concat(rest), whereas the mutated code
    // processes the insert through the loop which strips null attributes
    const a = new Delta()
      .retain(1, { bold: true })
      .insert('hello', { bold: null });
    const b = new Delta().retain(1);
    const composed = a.compose(b);
    // The insert with {bold: null} should be preserved as-is via the optimization path
    // In the mutated code, AttributeMap.compose({bold:null}, undefined, false) strips the null
    expect(composed.ops).toEqual([
      { retain: 1, attributes: { bold: true } },
      { insert: 'hello', attributes: { bold: null } },
    ]);
  });
});