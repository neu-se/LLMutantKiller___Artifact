import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta module exports", () => {
  it("named exports Op and OpIterator should be accessible", () => {
    // The mutation changes if(typeof module === 'object') to if(true)
    // When module.exports = Delta runs, it overwrites the ES module exports
    // This means named exports like Op and OpIterator may not be accessible
    const { Op, OpIterator, AttributeMap } = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
    expect(Op).toBeDefined();
    expect(OpIterator).toBeDefined();
    expect(AttributeMap).toBeDefined();
    
    const delta = new Delta().insert("Hello");
    expect(delta.ops).toEqual([{ insert: "Hello" }]);
  });
});