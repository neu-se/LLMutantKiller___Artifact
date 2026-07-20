import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("correctly handles boolean retain in transform", () => {
    const a = new Delta();
    a.ops = [{ retain: true as any }];

    const b = new Delta();
    b.ops = [{ retain: true as any }];

    const result = a.transform(b, false);
    // Op.length({ retain: true }) = typeof true === 'number' ? true : 1 = 1
    // So peekLength() = 1, length = min(1,1) = 1
    // otherOp = next(1) = { retain: true } (since peekLength = 1, takes whole op)
    // otherData = true
    // Original: typeof true === 'object' && true !== null => false && true => false => transformedData = 1
    // Mutated:  typeof true === 'object' || true !== null => false || true => true => transformedData = true
    // Original: delta.retain(1) => { retain: 1 }, chop removes it => []
    // Mutated:  delta.retain(true) => typeof true === 'number' is false, so pushes { retain: true }
    //           chop: typeof true === 'number' is false => NOT removed => [{ retain: true }]
    expect(result.ops).toEqual([]);
  });
});