// testCase.test.ts
describe('Complex AMD export', () => {
  it('should call define with a factory function when AMD is available', () => {
    jest.resetModules();
    let defineCalled = false;
    let factoryResult: any = null;
    (global as any).define = function(deps: any[], factory: () => any) {
      defineCalled = true;
      factoryResult = factory();
    };
    (global as any).define.amd = true;
    require('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
    delete (global as any).define;
    expect(defineCalled).toBe(true);
    expect(factoryResult).toBeDefined();
  });
});