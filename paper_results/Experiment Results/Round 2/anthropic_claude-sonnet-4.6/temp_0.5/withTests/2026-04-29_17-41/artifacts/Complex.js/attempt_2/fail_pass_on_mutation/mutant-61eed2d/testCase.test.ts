import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing initializes im to 0", () => {
  it("should parse a string with only real part and have im equal to 0", () => {
    // Force a scenario where z['im'] must be 0 before parsing starts
    // In mutated code, z['im'] = z['re'] = 0 chain is broken:
    // z[""] = z['re'] = 0 means z['im'] keeps its initial value from {re:0,im:0}
    // But since z is freshly created as {re:0,im:0}, im is already 0...
    // The real difference: z['re'] = 0 still happens via chain in mutation
    // So we need a case where im accumulation from a fresh object matters
    // Actually both should behave the same since z starts with im:0
    // Let me re-read: mutation sets z[""] not z['im'], so z['im'] stays as initialized (0)
    // This means behavior is identical... unless there's an edge case
    const c = new Complex("5");
    expect(c.re).toBe(5);
    expect(c.im).toBe(0);
  });
});