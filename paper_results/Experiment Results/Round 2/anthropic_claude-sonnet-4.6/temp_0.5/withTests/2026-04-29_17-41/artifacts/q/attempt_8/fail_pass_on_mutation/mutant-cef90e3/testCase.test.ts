import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("then", () => {
  it("rejection handler should not be invoked after fulfillment handler on a resolved deferred", () => {
    const d = Q.defer();
    const log: string[] = [];

    const result = d.promise.then(
      function(value: unknown) {
        log.push("fulfilled:" + value);
        return value;
      },
      function(reason: unknown) {
        log.push("rejected:" + reason);
        throw reason;
      }
    );

    d.resolve(42);

    return result.then(
      function(value: unknown) {
        expect(log).toEqual(["fulfilled:42"]);
        expect(value).toBe(42);
      },
      function(reason: unknown) {
        throw new Error("Should not reject: " + reason + " log=" + JSON.stringify(log));
      }
    );
  });
});