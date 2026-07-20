import infinite from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe("infinite source", () => {
  it("should call cb with end signal when end is truthy", () => {
    const generate = () => 42;
    const source = infinite(generate);
    
    const cb = jest.fn();
    source(true, cb);
    
    expect(cb).toHaveBeenCalledWith(true);
    expect(cb).not.toHaveBeenCalledWith(null, 42);
  });
});