import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const stackString = "at foo (bar.js:123:45)\n" +
            "at Q.nextTick (q.js:123:45)\n" +
            "at Q.defer (q.js:123:45)";
        const filteredStackString = Q.filterStackString(stackString);
        expect(filteredStackString).not.toContain("q.js");
    });
});