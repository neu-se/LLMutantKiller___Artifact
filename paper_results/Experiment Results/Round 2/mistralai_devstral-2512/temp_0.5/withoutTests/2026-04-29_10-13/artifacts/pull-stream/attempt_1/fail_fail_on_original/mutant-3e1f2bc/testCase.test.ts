import pull from "./pull.js";

describe("pull function behavior with object sinks", () => {
  it("should correctly handle object sinks with source and sink methods", () => {
    const source = {
      source: () => "source-data",
      sink: jest.fn()
    };

    const result = pull(source, {
      source: () => "transformed-data",
      sink: jest.fn()
    });

    expect(result).toBe("transformed-data");
  });
});