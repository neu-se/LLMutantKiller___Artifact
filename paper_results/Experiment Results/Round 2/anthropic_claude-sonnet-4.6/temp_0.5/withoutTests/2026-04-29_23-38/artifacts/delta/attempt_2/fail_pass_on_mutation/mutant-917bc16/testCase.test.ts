import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose optimization', () => {
  it('returns early with rest of ops when otherIter exhausted and last op matches', () => {
    // this has: retain(3, {bold:true}), retain(5, {bold:true})
    // other has: retain(3, {bold:true}) - exhausted after first op
    // The optimization should kick in and concat the rest
    const a = new Delta()
      .retain(3, { bold: true })
      .retain(5, { bold: true });
    const b = new Delta().retain(3, { bold: true });
    
    const result = a.compose(b);
    const expected = new Delta().retain(8, { bold: true });
    expect(result.ops).toEqual(expected.ops);
  });
});