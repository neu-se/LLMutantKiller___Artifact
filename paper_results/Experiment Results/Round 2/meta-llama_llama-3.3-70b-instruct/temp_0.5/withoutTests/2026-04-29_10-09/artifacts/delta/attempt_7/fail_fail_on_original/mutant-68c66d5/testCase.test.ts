describe('Delta', () => {
  it('should export Delta as default and named export', () => {
    const originalModule = require('module');
    const originalExports = originalModule.exports;
    const moduleMock = {
      exports: {},
    };
    jest.spyOn(originalModule, 'exports', 'get').mockImplementation(() => moduleMock.exports);
    const delta = require('../../../../../../../../subject_repositories/delta/src/Delta');
    expect(moduleMock.exports).toBeDefined();
    expect(moduleMock.exports.default).toBeDefined();
    expect(typeof moduleMock.exports.default).toBe('function');
    expect(new moduleMock.exports.default()).toBeInstanceOf(delta);
    expect(typeof moduleMock.exports).toBe('object');
    expect(moduleMock.exports.default).toBe(delta);
    jest.restoreAllMocks();
  });
});