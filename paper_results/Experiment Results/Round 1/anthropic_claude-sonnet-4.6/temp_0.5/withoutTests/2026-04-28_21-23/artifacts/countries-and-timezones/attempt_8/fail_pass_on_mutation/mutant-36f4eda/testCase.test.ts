jest.mock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json", () => ({
  countries: {
    "NOTZ": { n: "No Timezone Country" }
  },
  timezones: {}
}));

import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array for country with no timezones", () => {
    const result = getTimezonesForCountry("NOTZ");
    expect(result).toEqual([]);
    expect(result).not.toContain(null);
  });
});