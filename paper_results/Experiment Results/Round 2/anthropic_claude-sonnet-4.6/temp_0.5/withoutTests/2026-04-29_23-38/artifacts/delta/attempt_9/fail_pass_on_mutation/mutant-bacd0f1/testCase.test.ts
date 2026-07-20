import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("correctly transforms retain ops where other has number retain and this has object retain", () => {
    // this: retain {image: 'url'} (object, length=1)
    // other: retain 1 (number, length=1)
    // length = min(1,1) = 1
    // otherData = 1 = length
    // Original: false => transformedData = 1
    // Mutated: true => transformedData = 1
    // Same! Both give delta.retain(1) which chop() removes
    
    const a = new Delta().retain({ image: 'url' });
    const b = new Delta().retain(1);
    const result = a.transform(b, false);
    expect(result.ops).toEqual([]);
  });
});