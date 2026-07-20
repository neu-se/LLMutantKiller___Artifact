import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q object_create fallback behavior", () => {
  it("should use fallback implementation when Object.create is not available at module load time", () => {
    let QModule: any;
    const originalCreate = Object.create;

    jest.isolateModules(() => {
      // Simulate an environment where Object.create doesn't exist
      (Object as any).create = undefined;
      try {
        QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
      } finally {
        // Restore Object.create immediately
        (Object as any).create = originalCreate;
      }
    });

    // With original code (||): object_create = undefined || fallback = fallback → works
    // With mutated code (&&): object_create = undefined && fallback = undefined → crashes on defer()
    const d = QModule.defer();
    d.resolve(42);
    return d.promise.then((val: any) => {
      expect(val).toBe(42);
    });
  });
});