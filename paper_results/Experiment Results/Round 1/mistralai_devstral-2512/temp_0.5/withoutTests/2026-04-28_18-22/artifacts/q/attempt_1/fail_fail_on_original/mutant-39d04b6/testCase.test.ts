import { Q } from "./q";

describe("Q Promise inspection", () => {
  it("should return an object with state property when inspecting a promise", () => {
    const promise = Q.resolve(42);
    const inspection = promise.inspect();
    expect(inspection).toHaveProperty("state");
  });
});