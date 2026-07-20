const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester function behavior", () => {
  it("should return identity function when test is a string", () => {
    const identity = tester("test");
    const value = { key: "value" };
    expect(identity(value)).toBe(value);
  });
});