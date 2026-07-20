import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor with custom inspect", () => {
  it("should use custom inspect when provided", () => {
    const customDescriptor = {
      when: () => Q.resolve(42),
      get: (name: string) => 42,
      set: (name: string, value: any) => {},
      delete: (name: string) => {},
      post: (name: string, args: any[]) => 42,
      apply: (thisp: any, args: any[]) => 42,
      keys: () => ["test"]
    };

    const customInspect = () => ({ state: "custom", value: "test" });
    const promise = Q.makePromise(customDescriptor, undefined, customInspect);

    const result = promise.inspect();
    expect(result).toEqual({ state: "custom", value: "test" });
  });
});