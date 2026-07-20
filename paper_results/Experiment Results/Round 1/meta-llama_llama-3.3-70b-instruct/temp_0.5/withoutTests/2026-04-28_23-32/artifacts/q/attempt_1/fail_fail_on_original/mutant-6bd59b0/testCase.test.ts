import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch "get" operation correctly', () => {
        const promise = Q({ foo: 'bar' });
        const result = promise.dispatch("get", ['foo']);
        expect(result.inspect().state).toBe('fulfilled');
        expect(result.inspect().value).toBe('bar');
    });
});