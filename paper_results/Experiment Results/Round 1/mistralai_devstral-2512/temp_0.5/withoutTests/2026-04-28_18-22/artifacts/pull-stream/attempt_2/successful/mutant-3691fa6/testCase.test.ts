// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-3691fa6/testCase.test.ts
const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with RegExp key', () => {
  it('should return a function that extracts the first match when key is a RegExp', () => {
    const regexKey = /hello (\w+)/;
    const data = "hello world";
    const result = prop(regexKey)(data);
    expect(result).toBe("hello world");
  });
});