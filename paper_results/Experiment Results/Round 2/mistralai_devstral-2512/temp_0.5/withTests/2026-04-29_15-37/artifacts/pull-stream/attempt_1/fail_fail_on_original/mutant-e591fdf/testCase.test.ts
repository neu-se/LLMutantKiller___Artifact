import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function behavior with non-function first argument", () => {
  it("should not create a partial application when first argument is not a function", () => {
    const nonFunctionArg = { source: () => {} };
    const result = pull(nonFunctionArg);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);
  });
});