import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transformPosition", () => {
  it("insert exactly at index with priority true - offset equals index boundary", () => {
    // If original was (offset === index || !priority), then with priority=true
    // and offset===index, original returns index+length but mutated returns index
    const delta = new Delta().retain(2).insert("AB");
    // offset=2, index=2, priority=true
    // original (offset===index || !priority) = (true || false) = true => index += 2 => returns 4
    // mutated  (false || !priority)          = (false || false) = false => no shift => returns 2
    expect(delta.transformPosition(2, true)).toEqual(2);
  });
});