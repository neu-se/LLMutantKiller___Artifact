import ct from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("default export", () => {
  it("should have getCountry function on the default export", () => {
    expect(typeof ct.getCountry).toBe("function");
  });
});