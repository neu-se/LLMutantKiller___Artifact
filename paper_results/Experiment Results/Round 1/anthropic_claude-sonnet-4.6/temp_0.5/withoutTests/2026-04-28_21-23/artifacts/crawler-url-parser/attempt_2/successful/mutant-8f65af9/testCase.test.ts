import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text null handling", () => {
  it("should set text to empty string when anchor text is null for a new URL entry", () => {
    const fakeUrl = "http://example.com/target-page";

    // We need text to be null to expose the mutation
    // text == null ? "" : text  vs  false ? "" : text
    // When text is null: original → "", mutated → null

    const mockThis = {
      attr: (name: string) => (name === "href" ? fakeUrl : undefined),
      text: () => ({ trim: (): null => null }),
    };

    const mock$: any = (selector: any) => {
      if (selector === "base") return { attr: () => undefined };
      if (selector === "a")
        return { each: (cb: Function) => cb.call(mockThis, 0, {}) };
      return mockThis;
    };

    const results = extract(mock$, "http://example.com/");

    expect(results.length).toBeGreaterThan(0);
    // Original: text == null ? "" : text => "" (since text is null)
    // Mutated:  false ? "" : text => null
    expect(results[0].text).toBe("");
  });
});