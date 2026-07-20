import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch post with correct arguments', () => {
        const promise = Q({
            post: (name: string, args: any[]) => {
                if (args.length === 0) {
                    throw new Error('args should not be empty');
                }
                return args;
            }
        });
        expect(() => promise.post('name', [])).toThrowError('args should not be empty');
    });
});