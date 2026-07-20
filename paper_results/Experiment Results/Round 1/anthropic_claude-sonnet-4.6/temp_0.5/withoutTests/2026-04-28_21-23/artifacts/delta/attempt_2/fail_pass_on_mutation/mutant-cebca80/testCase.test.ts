import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("correctly returns baseIndex after processing delete and number retain ops", () => {
    // With mutation (else if true), an op that has no delete and no retain
    // would enter the object retain branch and throw an error
    // We need an op where op.delete is falsy AND op.retain is not a number AND not an object
    // That would be an insert op - but inserts are handled before this code
    
    // Actually the mutation makes the OUTER else-if condition always true
    // So any op that doesn't match (op.delete || typeof op.retain === 'number') 
    // would now enter the object-retain branch
    // An insert op: op.delete is undefined, op.retain is undefined
    // Original: skips (no matching condition)
    // Mutation: enters object-retain branch -> getEmbedTypeAndData throws
    
    const base = new Delta().insert("hello").insert({ image: "cat.png" });
    // delta with insert - invert should delete it
    const change = new Delta().insert("world");
    const inverted = change.invert(base);
    expect(inverted.ops).toEqual([{ delete: 5 }]);
  });
});