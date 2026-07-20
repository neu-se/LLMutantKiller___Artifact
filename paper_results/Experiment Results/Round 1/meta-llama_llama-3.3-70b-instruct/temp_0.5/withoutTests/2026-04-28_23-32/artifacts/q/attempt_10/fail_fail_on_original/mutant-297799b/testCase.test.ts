import { filterStackString } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly filter out Node.js frames from stack traces", () => {
        const stackString = "    at test (/path/to/test.js:1:1)\n    at Module._compile (module.js:643:30)";
        const filteredStackString = filterStackString(stackString);
        expect(filteredStackString).toContain("at test (/path/to/test.js:1:1)");
        expect(filteredStackString).not.toContain("at Module._compile (module.js:643:30)");
    });
});