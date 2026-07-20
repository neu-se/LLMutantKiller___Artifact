import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('OT property: apply(a, compose(b, transform(a,b))) == apply(b, compose(a, transform(b,a)))', () => {
    // Simple case: a deletes, b deletes same content
    const a = new Delta().delete(1);
    const b = new Delta().delete(1);
    
    const aTransformed = b.transform(a); // transform a against b
    const bTransformed = a.transform(b); // transform b against a
    
    // Both should be empty (delete is redundant after the other delete)
    expect(aTransformed.ops).toEqual([]);
    expect(bTransformed.ops).toEqual([]);
    
    // compose(b, transform(a,b)) should equal compose(a, transform(b,a))
    const left = b.compose(aTransformed);
    const right = a.compose(bTransformed);
    expect(left).toEqual(right);
  });
});