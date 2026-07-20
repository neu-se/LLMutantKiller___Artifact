import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform of two plain numeric retains produces empty delta after chop', () => {
    const a = new Delta().retain(2);
    const b = new Delta().retain(2);
    // Both are plain retains with no attributes; after transform and chop the result should be empty
    const result = a.transform(b, true);
    expect(result.ops.length).toEqual(0);
  });
});