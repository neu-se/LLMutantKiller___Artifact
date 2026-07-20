import Delta from "../../../src/Delta";
import { Op } from "../../../src/Delta";

describe("Delta transform", () => {
  it("should correctly transform embeds", () => {
    class TestEmbedHandler {
      compose(a: any, b: any, keepNull: boolean): any {
        return a;
      }

      invert(a: any, b: any): any {
        return a;
      }

      transform(a: any, b: any, priority: boolean): any {
        return a;
      }
    }

    Delta.registerEmbed("test", new TestEmbedHandler());

    const delta1 = new Delta();
    delta1.retain({ test: "data" });

    const delta2 = new Delta();
    delta2.retain({ test: "otherData" });

    const transformedDelta = delta1.transform(delta2);

    expect(transformedDelta.ops[0].retain).toEqual({ test: "data" });
  });
});