import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("transform()", () => {
  it("throws no handlers error when embed type has no registered handler during transform", () => {
    // No handler registered for 'myCustomEmbed'
    const a = new Delta().retain({ myCustomEmbed: { value: 1 } });
    const b = new Delta().retain({ myCustomEmbed: { value: 2 } });

    expect(() => {
      a.transform(b, true);
    }).toThrow('no handlers for embed type "myCustomEmbed"');
  });
});