import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should create an object with the given prototype", () => {
    const prototype = {};
    const object = Q(prototype);
    expect(Object.getPrototypeOf(object)).toBe(prototype);
    Object.create = null;
    expect(() => Q(prototype)).toThrowError();
  });
});