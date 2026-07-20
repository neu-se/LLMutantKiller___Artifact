import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when dispatching an empty operation', async () => {
        const obj = {};
        const promise = Q(obj).dispatch("", ['key', 'value']);
        await expect(promise).rejects.toThrow();
    });
});