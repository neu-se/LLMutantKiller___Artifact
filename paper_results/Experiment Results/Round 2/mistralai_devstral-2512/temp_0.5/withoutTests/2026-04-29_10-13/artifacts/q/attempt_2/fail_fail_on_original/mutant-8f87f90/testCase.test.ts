import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise post method", () => {
  it("should correctly invoke method with arguments on fulfilled object", async () => {
    const obj = {
      method: function(arg1: string, arg2: number) {
        return arg1 + arg2;
      }
    };

    const promise = Q(obj);
    const result = await promise.post("method", ["test", 42]);

    expect(result).toBe("test42");
  });
});