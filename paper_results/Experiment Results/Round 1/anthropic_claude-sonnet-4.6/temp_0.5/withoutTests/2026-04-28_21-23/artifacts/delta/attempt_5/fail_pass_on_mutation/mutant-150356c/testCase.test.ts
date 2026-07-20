import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should correctly handle compose when this starts with retain and other has leading plain retain followed by delete", () => {
    // this: retain(3) — just retaining 3 chars
    // other: retain(3) + delete(2) — retain 3, delete 2
    // but firstOther.retain=3, firstLeft starts at 3
    // With mutation: retain(3) from this gets consumed by loop (firstLeft=0)
    // otherIter.next(3) consumes the retain(3) from other
    // Then: nothing in thisIter vs delete(2) in otherIter
    // delete(2) gets pushed -> result: [retain(3), delete(2)]
    // With original: loop doesn't run, normal compose:
    // retain(3) + retain(3) = retain(3), then nothing + delete(2) = delete(2)
    // result: [retain(3), delete(2)] -- same again!
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain(3).delete(2);
    const result = delta1.compose(delta2);
    const expected = new Delta().retain(3).delete(2);
    expect(result.ops).toEqual(expected.ops);
  });
});