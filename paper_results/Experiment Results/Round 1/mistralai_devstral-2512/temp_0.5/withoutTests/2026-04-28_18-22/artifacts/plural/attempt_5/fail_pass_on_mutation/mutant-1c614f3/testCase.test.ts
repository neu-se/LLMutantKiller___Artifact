import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly apply string-based pluralization rules", () => {
    // Test a case that specifically triggers the string-based rule path
    // The mutation changes the condition from 'Function' to empty string
    // which would break string-based rules that expect function calls
    expect(plural("person")).toBe("people");
    expect(plural("mouse")).toBe("mice");
    expect(plural("goose")).toBe("geese");
  });
});