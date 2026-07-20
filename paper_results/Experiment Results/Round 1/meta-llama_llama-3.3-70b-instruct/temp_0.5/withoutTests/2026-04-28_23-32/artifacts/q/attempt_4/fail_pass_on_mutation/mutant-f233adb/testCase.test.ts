// eslint-disable-next-line @typescript-eslint/no-var-requires
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library", () => {
    it("should define Q when ses is defined and ok", () => {
        // Check if Q is defined
        expect(q).toBeDefined();
    });
});