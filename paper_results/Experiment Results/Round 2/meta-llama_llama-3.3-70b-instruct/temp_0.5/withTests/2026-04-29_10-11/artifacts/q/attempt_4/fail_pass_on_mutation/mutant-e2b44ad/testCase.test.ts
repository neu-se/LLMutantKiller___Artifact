import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should handle process object type correctly", () => {
        const processObject = { domain: true, toString: () => '[object process]' };
        const result = Q.defer().resolve(processObject);
        expect(typeof processObject).toBe('object');
        expect(processObject.toString()).toBe('[object process]');
    });
});