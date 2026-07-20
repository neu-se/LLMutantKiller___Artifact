import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when setting a property with an empty operation name', async () => {
        const obj: any = {};
        const promise = Q(obj).dispatch("", ['key', 'value']);
        await expect(promise).rejects.toThrow();
    });
});