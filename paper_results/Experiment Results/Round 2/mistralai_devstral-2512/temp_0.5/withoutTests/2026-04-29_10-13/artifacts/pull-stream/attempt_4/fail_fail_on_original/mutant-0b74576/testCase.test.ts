const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester function behavior", () => {
  it("should return identity function when test is not an object with test property", () => {
    const identity = tester(null);
    const value = {};
    expect(identity(value)).toBe(value);
  });
});