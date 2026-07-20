const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester function behavior", () => {
  it("should return identity function when test is undefined", () => {
    const identity = tester(undefined);
    expect(identity(42)).toBe(42);
  });
});