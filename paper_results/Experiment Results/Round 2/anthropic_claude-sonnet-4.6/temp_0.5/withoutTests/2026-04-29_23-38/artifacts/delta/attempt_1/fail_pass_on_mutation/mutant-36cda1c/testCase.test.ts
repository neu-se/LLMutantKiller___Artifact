import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.eachLine with embed ops", () => {
  it("should treat embed ops as non-newline content and include them in the current line", () => {
    // Create a delta with text, an embed, and then a newline
    const delta = new Delta()
      .insert("Hello ")
      .insert({ image: "url" })
      .insert("\nWorld");

    const lines: Delta[] = [];
    const attributes: object[] = [];

    delta.eachLine((line, attrs) => {
      lines.push(line);
      attributes.push(attrs);
    });

    // With original code: embed gets index=-1, so it's pushed to the current line
    // The first line should contain "Hello " + {image: "url"}
    // With mutated code: embed gets index=+1, so iter.next(1) is called on the embed
    // which would behave differently

    // There should be 2 lines: "Hello {image}\n" and "World"
    expect(lines.length).toBe(2);

    // First line should contain both the text "Hello " and the embed {image: "url"}
    expect(lines[0].ops).toHaveLength(2);
    expect(lines[0].ops[0]).toEqual({ insert: "Hello " });
    expect(lines[0].ops[1]).toEqual({ insert: { image: "url" } });

    // Second line should contain "World"
    expect(lines[1].ops).toHaveLength(1);
    expect(lines[1].ops[0]).toEqual({ insert: "World" });
  });
});