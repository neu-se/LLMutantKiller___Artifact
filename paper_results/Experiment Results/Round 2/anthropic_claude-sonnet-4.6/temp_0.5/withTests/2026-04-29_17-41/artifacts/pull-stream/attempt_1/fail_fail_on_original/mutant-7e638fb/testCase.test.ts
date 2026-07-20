import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility with non-regexp object key", () => {
  it("should return the key itself when passed a plain object without exec method", () => {
    const plainObj = { someProperty: "value" };
    const result = prop(plainObj);
    // In original code: 'object' === typeof key && 'function' === typeof key.exec
    // plainObj has no exec function, so condition is false, returns key itself
    // In mutated code: 'object' === typeof key && true
    // plainObj passes the condition, tries to call key.exec(data) which throws
    expect(result).toBe(plainObj);
  });
});