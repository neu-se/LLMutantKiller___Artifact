import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should use Object.create when it is supported and not null", () => {
    const originalCreate = Object.create;
    const createSpy = jest.fn(originalCreate);
    Object.create = createSpy;
    const prototype = {};
    Q(prototype);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(prototype);
    Object.create = originalCreate;
  });
});