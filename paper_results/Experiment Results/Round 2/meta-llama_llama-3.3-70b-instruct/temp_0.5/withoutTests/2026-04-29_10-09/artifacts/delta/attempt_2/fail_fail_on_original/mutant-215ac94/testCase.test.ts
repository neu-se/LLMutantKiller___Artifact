import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should correctly transform embeds", () => {
    const delta1 = new Delta();
    delta1.retain(1);

    const delta2 = new Delta();
    delta2.retain(1);

    const transformedDelta = delta1.transform(delta2);

    expect(transformedDelta.length()).toBe(1);
  });
});