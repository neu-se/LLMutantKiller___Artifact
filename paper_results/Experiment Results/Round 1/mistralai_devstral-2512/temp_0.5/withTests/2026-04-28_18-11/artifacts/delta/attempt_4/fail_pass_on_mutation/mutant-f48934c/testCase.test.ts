import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty string vs empty object", () => {
  it("should distinguish between empty string and empty object insertion", () => {
    const delta1 = new Delta().insert("");
    const delta2 = new Delta().insert({});
    
    // Empty string should not create an op
    expect(delta1.ops.length).toBe(0);
    
    // Empty object should create an op
    expect(delta2.ops.length).toBe(1);
    expect(delta2.ops[0]).toEqual({ insert: {} });
  });
});