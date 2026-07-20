import { buildCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";

describe("buildCountry function", () => {
  it("should return the same result when called multiple times with the same data and id", () => {
    const data = {
      countries: { "1": "Country1" },
      timezones: { "1": { c: ["1"], a: "", r: undefined } },
    };
    const id = "1";
    const result1 = buildCountry(data, id);
    const result2 = buildCountry(data, id);
    expect(result1).toEqual(result2);
  });
});