import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with 4 arguments", () => {
  it("should correctly handle 4 arguments in partial application", () => {
    let executionPath = "";
    const mockRead = (x: string) => {
      executionPath += "read,";
      return x;
    };

    const transform1 = (read: (x: string) => string) => (x: string) => {
      executionPath += "t1,";
      return read(x + "1");
    };

    const transform2 = (read: (x: string) => string) => (x: string) => {
      executionPath += "t2,";
      return read(x + "2");
    };

    const transform3 = (read: (x: string) => string) => (x: string) => {
      executionPath += "t3,";
      return read(x + "3");
    };

    const transform4 = (read: (x: string) => string) => (x: string) => {
      executionPath += "t4,";
      return read(x + "4");
    };

    const partialSink = pull(mockRead, transform1, transform2, transform3, transform4);
    const result = partialSink("input");

    // The mutation removes the case 4 handler, causing it to fall through to default
    // which should produce a different execution path
    expect(executionPath).toBe("t1,t2,t3,t4,read,");
  });
});