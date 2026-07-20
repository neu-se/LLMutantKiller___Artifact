import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should create an object with the given prototype when Object.create is supported", () => {
    const prototype = {};
    const object = Object.create(prototype);
    expect(Object.getPrototypeOf(object)).toBe(prototype);
    const qObject = Q(object);
    expect(Object.getPrototypeOf(qObject)).toBe(prototype);
  });

  it("should create an object with the given prototype when Object.create is not supported", () => {
    const prototype = {};
    const originalCreate = Object.create;
    Object.create = null;
    const object = Q(prototype);
    expect(Object.getPrototypeOf(object)).toBe(prototype);
    Object.create = originalCreate;
  });
});