import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with 4 arguments", () => {
  it("should correctly handle 4 arguments in partial application", () => {
    let callCount = 0;
    const mockRead = () => {
      callCount++;
      return () => "result";
    };

    const transform1 = (read: () => () => string) => () => read();
    const transform2 = (read: () => () => string) => () => read();
    const transform3 = (read: () => () => string) => () => read();
    const transform4 = (read: () => () => string) => () => read();

    const partialSink = pull(mockRead, transform1, transform2, transform3, transform4);
    const result = partialSink();

    expect(callCount).toBe(1);
    expect(typeof result).toBe("function");
    expect(result()).toBe("result");
  });
});