import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch post with correct arguments', () => {
        const promise = Q({
            post: (name: string, args: any[]) => args
        });
        expect(() => promise.post('name', [])).toThrowError();
    });
});