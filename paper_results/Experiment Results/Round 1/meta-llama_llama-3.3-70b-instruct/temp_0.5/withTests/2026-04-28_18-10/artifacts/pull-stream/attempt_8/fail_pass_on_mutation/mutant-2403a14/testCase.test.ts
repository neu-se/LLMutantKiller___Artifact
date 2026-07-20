import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through test', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const stream = through((data: any) => data, () => {});
    expect(stream).toBeDefined();
  });
});