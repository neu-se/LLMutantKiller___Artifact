import pull from "./pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with multiple arguments", () => {
    const read = () => "data";
    const sink1 = (read) => () => "sink1";
    const sink2 = (read) => () => "sink2";

    const partialPull = pull(sink1, sink2);
    const result = partialPull(read);

    expect(result).toBe("sink1");
  });
});