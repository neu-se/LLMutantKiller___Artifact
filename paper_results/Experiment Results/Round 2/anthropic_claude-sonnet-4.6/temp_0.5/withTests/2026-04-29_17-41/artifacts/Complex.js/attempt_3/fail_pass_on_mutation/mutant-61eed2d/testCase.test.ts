import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should not set empty string property when parsing a complex string", () => {
    const c = new Complex("3+2i");
    // In original code, z['im'] is properly set
    // In mutated code, z[""] is set instead
    // The resulting Complex object should not have an empty string key
    expect((c as any)[""]).toBeUndefined();
  });
});