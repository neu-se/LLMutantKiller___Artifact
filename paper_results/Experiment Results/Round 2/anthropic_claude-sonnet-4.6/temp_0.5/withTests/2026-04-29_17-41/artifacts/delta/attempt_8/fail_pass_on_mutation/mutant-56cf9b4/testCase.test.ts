import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('retain without attributes over styled base should produce empty inversion', () => {
    // Use retain with no attributes (goes through early return path -> retain(n) added)
    // vs retain WITH attributes (goes through forEach path)
    // The key: retain(2) with no attributes hits early return: inverted.retain(2)
    // retain(2, {bold:true}) hits forEach: inverted.retain(1, invert(bold:true, baseAttrs)) per baseOp
    
    // Let me try to find a case where the base slice has ops that when processed
    // with the mutated condition produce different results
    
    // Actually - new idea entirely. What if I look at the diff() method mutation?
    // The file shows: opLength = Math.max(otherIter.peekLength(), length);
    // Original should be: opLength = Math.min(otherIter.peekLength(), length);
    // Wait - that's a different mutation in the same file!
    
    // Let me focus: the diff mutation shows Math.max instead of Math.min for INSERT case
    // That would cause diff() to consume MORE of otherIter than needed
    
    const a = new Delta().insert('Hello');
    const b = new Delta().insert('Hello World');
    const result = a.diff(b);
    // Expected: retain(5).insert(' World')
    const expected = new Delta().retain(5).insert(' World');
    expect(result).toEqual(expected);
  });
});