import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should return a callable source function that yields array values", (done) => {
    // In mutated code, abortCb(undefined, undefined, undefined) is called during setup
    // which may throw or cause the function to not return properly
    let source: any;
    expect(() => {
      source = values([1, 2, 3]);
    }).not.toThrow();
    
    expect(source).toBeDefined();
    
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(1);
      done();
    });
  });
});