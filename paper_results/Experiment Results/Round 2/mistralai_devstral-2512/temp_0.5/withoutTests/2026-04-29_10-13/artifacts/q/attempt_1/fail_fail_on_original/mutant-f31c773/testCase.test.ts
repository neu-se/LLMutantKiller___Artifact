import { Q } from "./q.js";

describe("Q.set mutation test", () => {
  it("should correctly set a property on a promise", () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);
    return promise.set("prop", "updated").then(() => {
      expect(obj.prop).toBe("updated");
    });
  });
});