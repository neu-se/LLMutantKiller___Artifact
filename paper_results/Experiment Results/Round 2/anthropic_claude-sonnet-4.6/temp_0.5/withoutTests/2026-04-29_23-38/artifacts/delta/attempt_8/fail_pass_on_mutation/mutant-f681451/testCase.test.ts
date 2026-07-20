import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform: this delete makes other delete redundant', () => {
    // When both sides delete the same content, transforming b by a
    // should result in empty because a's delete makes b's delete redundant
    const a = new Delta().delete(1);
    const b = new Delta().delete(1);
    const result = a.transform(b, false);
    expect(result.ops).toEqual([]);
  });
});