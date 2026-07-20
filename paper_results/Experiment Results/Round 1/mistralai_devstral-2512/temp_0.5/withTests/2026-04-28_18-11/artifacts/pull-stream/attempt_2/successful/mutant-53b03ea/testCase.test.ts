const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester function behavior", () => {
  it("should return test.test function when test is an object with test method", () => {
    const testObj = {
      test: (data: any) => data * 2
    };
    const result = tester(testObj);
    expect(result(5)).toBe(10);
  });
});