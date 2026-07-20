import { Q } from "./q";

describe("Q Promise inspection", () => {
  it("should use custom inspect function when provided", () => {
    const customInspect = jest.fn(() => ({ state: "custom" }));
    const promise = Q.makePromise({}, void 0, customInspect);
    promise.inspect();
    expect(customInspect).toHaveBeenCalled();
  });
});