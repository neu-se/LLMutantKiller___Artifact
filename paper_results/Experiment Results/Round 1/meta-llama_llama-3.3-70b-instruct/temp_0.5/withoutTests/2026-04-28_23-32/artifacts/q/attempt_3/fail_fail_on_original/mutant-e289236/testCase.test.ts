import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should not resolve promises when messages is empty", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const messages: any[] = [];

    promise.promiseDispatch = function (resolve, op, args) {
      messages.push(args);
    };

    deferred.resolve("test");
    expect(messages.length).toBe(1);

    // Reset the messages array
    messages.length = 0;

    // Call promiseDispatch again with an empty messages array
    promise.promiseDispatch(null, "when", []);
    expect(messages.length).toBe(0);
  });

  it("should resolve promises when messages is not empty", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const messages: any[] = [];

    promise.promiseDispatch = function (resolve, op, args) {
      messages.push(args);
    };

    deferred.resolve("test");
    expect(messages.length).toBe(1);

    // Call promiseDispatch again with a non-empty messages array
    promise.promiseDispatch(null, "when", ["test"]);
    expect(messages.length).toBe(2);
  });
});