describe("Q.deprecate", () => {
  it("should call console.warn when the deprecated function is called", () => {
    const Q = require('../../../../q');
    const deprecatedFunction = Q.deprecate(function () {}, "testFunction", "newFunction");
    const originalWarn = console.warn;
    console.warn = jest.fn();
    deprecatedFunction();
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", expect.any(Error));
    console.warn = originalWarn;
  });
});