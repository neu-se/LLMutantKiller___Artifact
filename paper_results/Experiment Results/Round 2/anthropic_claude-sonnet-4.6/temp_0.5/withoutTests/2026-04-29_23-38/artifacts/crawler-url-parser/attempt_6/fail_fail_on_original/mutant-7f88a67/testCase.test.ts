import * as crawlerUrlParser from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('normalizeHttps option value', () => {
  it('result_normalize_options should have normalizeHttps set to false', () => {
    // Access the options if exported
    const options = (crawlerUrlParser as any).result_normalize_options;
    expect(options).toBeDefined();
    expect(options.normalizeHttps).toBe(false);
  });
});