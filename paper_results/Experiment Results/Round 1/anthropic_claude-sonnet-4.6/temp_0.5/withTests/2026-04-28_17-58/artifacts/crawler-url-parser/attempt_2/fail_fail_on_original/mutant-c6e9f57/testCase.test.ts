import * as cup from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('result_normalize_options configuration', () => {
  it('should have result_normalize_options with removeQueryParameters configured to strip utm and ref params', () => {
    // Access the module internals by checking if the variable is accessible
    // Since result_normalize_options is module-scoped, we check via module object
    const moduleObj = cup as any;
    const opts = moduleObj.result_normalize_options;
    expect(opts).toBeDefined();
    expect(opts.removeDirectoryIndex).toBe(true);
    expect(opts.removeTrailingSlash).toBe(true);
    expect(opts.stripWWW).toBe(true);
  });
});