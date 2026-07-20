import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain where other retain is an object and this retain is a number', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({ image: 'http://example.com' }, { bold: true });
    const result = a.transform(b, false);
    // otherData = {image:'...'} (object), original: true → transformedData = otherData
    // mutated: true → transformedData = otherData (same)
    // attrs = AttributeMap.transform(undefined, {bold:true}, false) = {bold:true}
    // delta.retain({image:'...'}, {bold:true})
    const expected = new Delta().retain({ image: 'http://example.com' }, { bold: true });
    expect(result).toEqual(expected);
  });
});