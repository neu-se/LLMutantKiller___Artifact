import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.del", () => {
  it("should delete a property from an object when using del()", async () => {
    const object = { a: 10, b: 20 };
    const result = await Q.fcall(function () {
      return object;
    }).del("a");

    expect("a" in object).toBe(false);
    expect(result).toBe(undefined);
    expect(object.b).toBe(20);
  });
});