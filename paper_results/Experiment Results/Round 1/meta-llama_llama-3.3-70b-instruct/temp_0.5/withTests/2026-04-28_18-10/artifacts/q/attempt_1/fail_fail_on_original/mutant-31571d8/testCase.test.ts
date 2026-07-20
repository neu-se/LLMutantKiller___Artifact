import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should include all the stacks when error.__minimumStackCounter__ is not defined or greater than p.stackCounter", () => {
        var error = new Error();
        error.__minimumStackCounter__ = undefined;
        var p = { stack: "some stack", stackCounter: 1 };
        var stacks: string[] = [];
        var result = makeStackTraceLong(error, p);
        expect(result).toContain(p.stack);
    });

    it("should not include the stacks when error.__minimumStackCounter__ is defined and less than or equal to p.stackCounter", () => {
        var error = new Error();
        error.__minimumStackCounter__ = 2;
        var p = { stack: "some stack", stackCounter: 1 };
        var stacks: string[] = [];
        var result = makeStackTraceLong(error, p);
        expect(result).not.toContain(p.stack);
    });
});