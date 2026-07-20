import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should throw when partial sink is called multiple times", () => {
    const sink = (read: any) => () => "data";
    const partialPull = pull(sink);

    // First call should work
    const firstResult = partialPull(() => "input");

    // Second call should throw
    expect(() => partialPull(() => "input")).toThrow("partial sink should only be called once!");
  });
});