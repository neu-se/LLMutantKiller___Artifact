import ct from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("default export", () => {
  it("should export getCountry function on the default export", () => {
    expect(typeof ct.getCountry).toBe("function");
    const result = ct.getCountry("MX");
    expect(result).not.toBeNull();
    expect(result.id).toBe("MX");
    expect(result.name).toBe("Mexico");
  });
});