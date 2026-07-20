import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should delete a property from an object and return undefined", () => {
    const obj = { key: "value" };
    return Q(obj).del("key").then((result) => {
      expect(result).toBeUndefined();
      expect(obj).not.toHaveProperty("key");
    });
  });
});