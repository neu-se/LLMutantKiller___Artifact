import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should delete a property from an object and return undefined", () => {
    const obj = { key: "value" };
    return Q["delete"](obj, "key").then((result: any) => {
      expect(result).toBeUndefined();
      expect(obj).not.toHaveProperty("key");
    });
  });
});