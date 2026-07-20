import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty fallback", () => {
  it("assigns descriptor value to property when acting as Object.defineProperty fallback, enabling long stack trace concatenation", () => {
    const originalDefineProperty = Object.defineProperty;

    // @ts-ignore
    delete Object.defineProperty;

    jest.resetModules();

    let QReloaded: any;
    try {
      QReloaded = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Object.defineProperty = originalDefineProperty;
    }

    QReloaded.longStackSupport = true;

    const deferred = QReloaded.defer();
    const promise = deferred.promise.then(function outerStep() {
      return QReloaded.reject(new Error("inner error"));
    });
    deferred.resolve();

    return promise.then(
      () => { throw new Error("should not fulfill"); },
      (err: Error) => {
        expect(err.stack).toContain("From previous event:");
      }
    );
  });
});