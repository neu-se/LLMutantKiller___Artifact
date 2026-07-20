import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should resolve promises correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const messages: any[] = [];

    promise.promiseDispatch = function (resolve, op, args) {
      messages.push(args);
    };

    deferred.resolve("test");
    expect(messages.length).toBe(1);
    expect(messages[0][0]).toBe("test");
  });
});