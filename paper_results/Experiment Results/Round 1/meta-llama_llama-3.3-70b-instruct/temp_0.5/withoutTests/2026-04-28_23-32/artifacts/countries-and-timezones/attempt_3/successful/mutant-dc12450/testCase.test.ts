import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";

describe("buildCountry function", () => {
  it("should reuse the timezonesMap when called multiple times with the same data", () => {
    const data = {
      countries: { "1": "Country1" },
      timezones: { "1": { c: ["1"], a: "", r: undefined } },
    };
    const id = "1";
    const result1 = buildCountry(data, id);
    const modifiedData = { ...data, timezones: { "1": { c: ["1"], a: "", r: "new" } } };
    const result2 = buildCountry(modifiedData, id);
    expect(result1).toEqual(result2);
  });
});