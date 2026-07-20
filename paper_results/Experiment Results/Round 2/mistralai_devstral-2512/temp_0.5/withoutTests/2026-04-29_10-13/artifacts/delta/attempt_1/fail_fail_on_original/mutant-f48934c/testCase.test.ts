import Delta from "./src/Delta";

describe("Delta insert method", () => {
  it("should not create an insert operation when an empty string is provided", () => {
    const delta = new Delta();
    delta.insert("");
    expect(delta.ops).toEqual([]);
  });
});