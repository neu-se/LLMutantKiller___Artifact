import pull from "./pull.js";

describe("pull function with object sink", () => {
  it("should correctly handle object sinks with source and sink methods", () => {
    const source = {
      source: () => "data",
      sink: (read) => {
        const result = read();
        return () => result.toUpperCase();
      }
    };

    const result = pull(source);
    expect(result()).toBe("DATA");
  });
});