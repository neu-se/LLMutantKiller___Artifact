import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with 4 arguments", () => {
  it("should correctly handle 4 arguments in partial application", () => {
    const mockRead = (x: string) => x;
    const transform1 = (read: (x: string) => string) => (x: string) => read(x + "1");
    const transform2 = (read: (x: string) => string) => (x: string) => read(x + "2");
    const transform3 = (read: (x: string) => string) => (x: string) => read(x + "3");
    const transform4 = (read: (x: string) => string) => (x: string) => read(x + "4");

    const partialSink = pull(mockRead, transform1, transform2, transform3, transform4);
    const result = partialSink("input");

    expect(result).toBe("input1234");
  });
});