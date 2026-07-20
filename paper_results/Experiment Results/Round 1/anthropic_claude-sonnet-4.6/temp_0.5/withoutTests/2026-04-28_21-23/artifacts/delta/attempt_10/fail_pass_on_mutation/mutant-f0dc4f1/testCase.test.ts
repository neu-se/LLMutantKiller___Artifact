import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("OpIterator peekType mutation detection", () => {
  it("should return retain for object retain and not fall through to insert", () => {
    // Create iterator where retain is an object (embed)
    const embedOp = { retain: { image: true } };
    const iter = new Iterator([embedOp, { insert: "x" }]);
    
    // Consume the retain op partially - offset should matter
    const type1 = iter.peekType();
    expect(type1).toBe("retain");
    
    iter.next();
    const type2 = iter.peekType();
    expect(type2).toBe("insert");
    
    // After exhausting all ops
    iter.next();
    const type3 = iter.peekType();
    expect(type3).toBe("retain"); // no-op case
  });
});