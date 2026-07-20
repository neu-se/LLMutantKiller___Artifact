import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q keys operation on fulfilled promise", () => {
  it("should return own enumerable keys of an object without prototype keys", async () => {
    // Create an object that inherits properties - object_keys should only return own keys
    // In the fallback, object_hasOwnProperty filters inherited keys
    // The mutation removes keys.push(key), so keys array stays empty
    // We need to trigger the fallback by having Object.keys undefined at module load
    // Since we can't do that, let's use jest.resetModules and mock
    
    jest.resetModules();
    const originalKeys = Object.keys;
    // @ts-ignore
    delete Object.keys;
    
    let QModule: any;
    try {
      QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Object.keys = originalKeys;
    }
    
    const obj = { a: 1, b: 2 };
    const keys = await QModule(obj).keys();
    expect(keys.sort()).toEqual(["a", "b"]);
  });
});