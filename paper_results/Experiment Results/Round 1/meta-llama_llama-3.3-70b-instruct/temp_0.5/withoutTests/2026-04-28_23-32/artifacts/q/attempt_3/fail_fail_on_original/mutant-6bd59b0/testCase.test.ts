import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch "get" operation correctly', () => {
        const promise = Q({ foo: 'bar' });
        const result = promise.dispatch("get", ['foo']);
        expect(result.inspect().state).toBe('fulfilled');
        expect(result.inspect().value).toBe('bar');

        // Test the mutation by checking the behavior when the operation name is an empty string
        const mutatedResult = promise.dispatch("", ['foo']);
        expect(mutatedResult.inspect().state).toBe('rejected');
    });
});