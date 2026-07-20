import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with unregistered embed type', () => {
  it('should throw an error when transforming embed retains with no registered handler', () => {
    // Ensure no handler is registered for 'myembed'
    Delta.unregisterEmbed('myembed');

    const a = new Delta().retain({ myembed: { value: 1 } });
    const b = new Delta().retain({ myembed: { value: 2 } });

    // Original code calls Delta.getHandler(embedType) which throws when no handler registered
    // Mutated code skips getHandler call (if (true) without const handler = ...) so no throw
    expect(() => {
      a.transform(b, true);
    }).toThrow('no handlers for embed type "myembed"');
  });
});