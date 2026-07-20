import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe("map through - identity when no mapper provided", () => {
  it("should return identity function when no mapper is provided", (done) => {
    const through = map(null);
    
    // through should be the identity function (id), not a through stream
    // When mapper is falsy, map() should return the id function directly
    // The id function just returns its argument unchanged
    const testValue = { foo: "bar" };
    const result = through(testValue);
    
    expect(result).toBe(testValue);
    done();
  });
});