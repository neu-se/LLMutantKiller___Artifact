import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
// line 2
// line 3
// ... (500 comment lines)
describe("...", () => {
  it("...", async () => {
    Q.longStackSupport = true;
    const deferred = Q.defer(); // at line ~508
    deferred.reject(new Error("test"));
    const caught = await deferred.promise.then(null, (e: Error) => e);
    expect(caught.stack).toContain("testCase.test.ts");
  });
});