import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should return criteria for criterion", () => {
    // With mutation: first rule (uncountable regex) function is called with ('criterion', regex)
    // function(w) { return w } returns 'criterion'
    // With original: string rule matches and returns 'criteria'
    expect(plural("criterion", 2)).toBe("criteria");
  });
});