import {parseMessage, CommitMessage} from '../src/commitMessage';

describe('parseMessage', () => {
  test('single line message parse', () => {
    const message = 'feat: add new feature';
    const result: CommitMessage = parseMessage(message);
    expect(result.header).toBe('feat: add new feature');
    expect(result.body).toStrictEqual([]);
    expect(result.hasBody).toBe(false);
    expect(result.footer).toBe(null);
    expect(result.hasFooter).toBe(false);
  });

  test('multi line message parse without footer', () => {
    const message = 'feat: add new feature\n\nthis is a new feature';
    const result: CommitMessage = parseMessage(message);
    expect(result.header).toBe('feat: add new feature');
    expect(result.body).toEqual(['this is a new feature']);
    expect(result.hasBody).toBe(true);
    expect(result.footer).toBe(null);
    expect(result.hasFooter).toBe(false);
  });

  test('multi line message parse with footer', () => {
    const message = 'feat: add new feature\n\nthis is a new feature\n\nclose #123';
    const result: CommitMessage = parseMessage(message);
    expect(result.header).toBe('feat: add new feature');
    expect(result.body).toEqual(['this is a new feature']);
    expect(result.hasBody).toBe(true);
    expect(result.footer).toBe('close #123');
    expect(result.hasFooter).toBe(true);
  });

  test('multi line message parse with fix footer', () => {
    const message = 'feat: add new feature\n\nthis is a new feature\n\nfix #123';
    const result: CommitMessage = parseMessage(message);
    expect(result.header).toBe('feat: add new feature');
    expect(result.body).toEqual(['this is a new feature']);
    expect(result.hasBody).toBe(true);
    expect(result.footer).toBe('fix #123');
    expect(result.hasFooter).toBe(true);
  });

  test('multi line message parse with multiple paragraphs', () => {
    const message = 'feat: add new feature\n\nparagraph one\n\nparagraph two\n\nclose #123';
    const result: CommitMessage = parseMessage(message);
    expect(result.header).toBe('feat: add new feature');
    expect(result.body).toEqual(['paragraph one', 'paragraph two']);
    expect(result.hasBody).toBe(true);
    expect(result.footer).toBe('close #123');
    expect(result.hasFooter).toBe(true);
  });

  test('multi line message parse with footer without body', () => {
    const message = 'feat: add new feature\n\nclose #123';
    const result: CommitMessage = parseMessage(message);
    expect(result.header).toBe('feat: add new feature');
    expect(result.body).toStrictEqual([]);
    expect(result.hasBody).toBe(false);
    expect(result.footer).toBe('close #123');
    expect(result.hasFooter).toBe(true);
  });
});
