import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Delta compose with embeds", () => {
  it("should correctly compose embeds with retain action", () => {
    // Setup a custom embed handler for testing
    const testEmbedType = "test-embed";
    Delta.registerEmbed(testEmbedType, {
      compose: (a, b, keepNull) => ({ composed: a, with: b, keepNull }),
      invert: (a, b) => ({ inverted: a, from: b }),
      transform: (a, b, priority) => ({ transformed: a, by: b, priority }),
    });

    // Create deltas with embed operations
    const delta1 = new Delta().retain({ [testEmbedType]: "data1" });
    const delta2 = new Delta().retain({ [testEmbedType]: "data2" });

    // Compose the deltas
    const result = delta1.compose(delta2);

    // Verify the result has the expected structure
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toHaveProperty("retain");
    expect(result.ops[0].retain).toHaveProperty(testEmbedType);
    expect(result.ops[0].retain[testEmbedType]).toEqual({
      composed: "data1",
      with: "data2",
      keepNull: true,
    });

    // Clean up
    Delta.unregisterEmbed(testEmbedType);
  });
});