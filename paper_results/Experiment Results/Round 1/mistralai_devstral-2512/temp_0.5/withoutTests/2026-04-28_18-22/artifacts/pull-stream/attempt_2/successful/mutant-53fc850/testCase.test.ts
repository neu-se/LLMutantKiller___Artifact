const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester function behavior", () => {
  it("should return test.test function when test is an object with test method", () => {
    const testObj = {
      test: (data: any) => `tested:${data}`
    };
    const result = tester(testObj);
    expect(typeof result).toBe('function');
    expect(result('data')).toBe('tested:data');
  });
});