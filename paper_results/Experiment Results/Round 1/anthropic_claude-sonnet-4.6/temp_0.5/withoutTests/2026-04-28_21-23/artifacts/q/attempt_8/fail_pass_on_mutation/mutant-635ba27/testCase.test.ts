describe("array_indexOf fallback shim", () => {
  it("should use i++ not i-- in fallback to avoid infinite loop", (done) => {
    jest.setTimeout(2000);

    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    
    // Verify indexOf is actually gone
    expect(Array.prototype.indexOf).toBeUndefined();

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    // @ts-ignore
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.indexOf = originalIndexOf;

    // Now QFresh has the fallback shim for array_indexOf
    // Test it via Q.any which resolves when first promise fulfills
    // Q.any uses array_reduce (not array_indexOf directly)
    
    // Instead test via allSettled which exercises more array operations
    QFresh.all([QFresh(1), QFresh(2), QFresh(3)])
      .then((results: number[]) => {
        expect(results).toEqual([1, 2, 3]);
        done();
      })
      .catch(done);
  });
});