import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set mutation test", () => {
  it("should correctly pass key and value to dispatch when setting a property", async () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);
    const result = await promise.set("prop", "updated");

    // Verify the property was set correctly
    expect(result).toBe("updated");
    expect(obj.prop).toBe("updated");
  });
});