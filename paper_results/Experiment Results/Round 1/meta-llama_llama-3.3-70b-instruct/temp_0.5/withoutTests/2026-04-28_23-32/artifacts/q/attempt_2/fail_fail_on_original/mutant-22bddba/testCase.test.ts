import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a global Q object when executed as a script', () => {
        // Check if the Q object is created on the global object
        expect((global as any).Q).toBeDefined();
    });
});