import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch "get" operation correctly', async () => {
        const promise = Q({ foo: 'bar' });
        const result = await promise.get('foo');
        expect(result).toBe('bar');

        // Test the mutation by checking the behavior when the operation name is an empty string
        await expect(promise.dispatch("", ['foo'])).rejects.toThrow();
    });
});