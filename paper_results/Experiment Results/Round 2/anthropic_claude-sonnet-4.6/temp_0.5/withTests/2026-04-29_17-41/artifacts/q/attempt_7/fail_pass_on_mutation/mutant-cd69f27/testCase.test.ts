import * as fs from "fs";
import * as path from "path";

describe("Q module", () => {
  it("fulfills a deferred promise with the resolved value", () => {
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    const deferred = Q.defer();
    deferred.resolve(99);

    return deferred.promise.then((value: number) => {
      expect(value).toBe(99);
    });
  });
});