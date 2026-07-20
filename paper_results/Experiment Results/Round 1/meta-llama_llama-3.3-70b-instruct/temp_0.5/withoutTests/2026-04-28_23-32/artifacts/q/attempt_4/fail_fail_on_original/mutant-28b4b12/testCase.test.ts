import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch post with correct arguments', () => {
        const promise = Q({
            post: function(name: string, args: any[]) {
                return args;
            }
        });
        const result = promise.post('name', ['arg1', 'arg2']);
        expect(result).toEqual(['arg1', 'arg2']);
    });
});