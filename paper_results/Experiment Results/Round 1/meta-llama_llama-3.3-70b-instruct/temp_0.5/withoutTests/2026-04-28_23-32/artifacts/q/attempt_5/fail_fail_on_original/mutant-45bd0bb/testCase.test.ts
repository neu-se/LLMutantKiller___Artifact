import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should create an object when Object.create is supported", () => {
    const originalCreate = Object.create;
    const createSpy = jest.fn((o) => originalCreate(o));
    Object.create = createSpy;
    const prototype = {};
    const object = Q(prototype);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(prototype);
    Object.create = originalCreate;
  });

  it("should not create an object when Object.create is not supported", () => {
    const originalCreate = Object.create;
    Object.create = null;
    const prototype = {};
    expect(() => Q(prototype)).toThrowError();
    Object.create = originalCreate;
  });
});