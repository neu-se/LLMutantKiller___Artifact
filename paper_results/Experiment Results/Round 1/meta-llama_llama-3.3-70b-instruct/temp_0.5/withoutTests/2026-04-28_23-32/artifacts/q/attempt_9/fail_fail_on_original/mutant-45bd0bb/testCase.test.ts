describe("Q", () => {
  it("should create an object with the given prototype when Object.create is supported", () => {
    const Q = require("../../../../../../../../subject_repositories/q/q.js");
    const originalCreate = Object.create;
    const createSpy = jest.fn((o) => originalCreate(o));
    Object.create = createSpy;
    const prototype = {};
    Q(prototype);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(prototype);
    Object.create = originalCreate;
  });

  it("should throw an error when Object.create is not a function and Q is used with a prototype", () => {
    const Q = require("../../../../../../../../subject_repositories/q/q.js");
    const originalCreate = Object.create;
    Object.create = () => {};
    Object.create = null;
    expect(() => {
      const prototype = {};
      Q(prototype);
    }).toThrowError();
    Object.create = originalCreate;
  });
});