import { dispatch } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function", () => {
  it("should dispatch a message to an object and return a promise", async () => {
    const testObject = {
      testMethod: (arg1: number, arg2: number) => {
        return arg1 + arg2;
      }
    };

    const result = await dispatch(testObject, "testMethod", [2, 3]);
    expect(result).toBe(5);
  });
});