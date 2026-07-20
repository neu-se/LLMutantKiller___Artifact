import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - done flag behavior", () => {
  it("should not call rejected handler when promise is already fulfilled", async () => {
    const results: string[] = [];
    
    await Q.Promise(function(resolve: Function) {
      resolve(42);
    }).then(
      function(value: number) {
        results.push("fulfilled:" + value);
        return value;
      },
      function(err: any) {
        results.push("rejected:" + err);
      }
    );
    
    expect(results).toEqual(["fulfilled:42"]);
    expect(results).toHaveLength(1);
  });
});