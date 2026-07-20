import buildCountry from "./src/build-country";

describe("buildCountry", () => {
  it("should return empty array for allTimezones when no timezones are available", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {}
    };
    const result = buildCountry(data, "US");
    expect(result?.allTimezones).toEqual([]);
  });
});