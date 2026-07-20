describe("plural function", () => {
  it("should correctly pluralize knife to knives using f/fe rule", () => {
    jest.resetModules();
    const plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    // With mutation if(true), first rule always fires without testing regex match
    // The uncountable words rule would return 'knife' unchanged
    // Original correctly tests each regex before applying
    expect(plural("knife")).toBe("knives");
  });
});