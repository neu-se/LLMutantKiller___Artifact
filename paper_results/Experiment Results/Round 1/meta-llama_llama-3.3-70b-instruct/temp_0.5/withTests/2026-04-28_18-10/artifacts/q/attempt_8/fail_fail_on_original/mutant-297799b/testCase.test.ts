import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const stackString = "at myFunction (myFile.js:10:20)\n" +
                            "at Q.nextTick (q.js:123:45)\n" +
                            "at node:internal/process/task_queues (node:internal/process/task_queues:126:5)";
        const filteredStackString = Q.filterStackString(stackString);
        expect(filteredStackString).not.toContain("q.js");
        expect(filteredStackString).not.toContain("node:internal/process/task_queues");
    });
});