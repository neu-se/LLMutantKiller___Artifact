import index from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('Test the behavior of the mutated file', () => {
  it('should detect the mutation', () => {
    expect(index).toHaveProperty('getCountry');
  });
});