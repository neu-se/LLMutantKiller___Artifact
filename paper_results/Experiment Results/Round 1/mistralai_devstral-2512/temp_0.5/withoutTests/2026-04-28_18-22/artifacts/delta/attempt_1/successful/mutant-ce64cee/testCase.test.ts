import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta unregisterEmbed', () => {
  it('should remove the handler for the specified embed type', () => {
    const embedType = 'test-embed';
    const handler = {
      compose: jest.fn(),
      invert: jest.fn(),
      transform: jest.fn(),
    };

    Delta.registerEmbed(embedType, handler);
    expect(() => Delta.getHandler(embedType)).not.toThrow();

    Delta.unregisterEmbed(embedType);
    expect(() => Delta.getHandler(embedType)).toThrow(`no handlers for embed type "${embedType}"`);
  });
});