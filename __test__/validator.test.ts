import validate from '../src/validator';
import {CommitMessage} from '../src/commitMessage';
import * as core from '@actions/core';
import exp from 'constants';

jest.mock('@actions/core');

describe('validate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should validate a correct commit message', () => {
    const commitMessage: CommitMessage = {
      header: 'feat(scope): add new feature',
      body: ['This is a valid body paragraph.'],
      footer: 'close #123',
      hasBody: true,
      hasFooter: true,
    };

    validate(commitMessage);

    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it('should validate a correct commit message without scope', () => {
    const commitMessage: CommitMessage = {
      header: 'feat: add new feature',
      body: ['This is a valid body paragraph.'],
      footer: 'close #123',
      hasBody: true,
      hasFooter: true,
    };

    validate(commitMessage);

    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it('should validate a correct merge pull request commit message', () => {
    const commitMessage: CommitMessage = {
      header: 'Merge pull request #123 from user/branch',
      body: [],
      footer: null,
      hasBody: false,
      hasFooter: false,
    };

    validate(commitMessage);

    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it('should validate a correct revert commit message', () => {
    const commitMessage: CommitMessage = {
      header: 'Revert "chore: build latest release file"',
      body: [],
      footer: null,
      hasBody: false,
      hasFooter: false,
    };

    validate(commitMessage);

    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it('should fail for invalid header', () => {
    const commitMessage: CommitMessage = {
      header: 'invalid header',
      body: ['This is a valid body paragraph.'],
      footer: 'close #123',
      hasBody: true,
      hasFooter: true,
    };

    validate(commitMessage);

    expect(core.setFailed).toHaveBeenCalledWith(
      'Invalid header: invalid header',
    );
  });

  it('should fail for invalid type', () => {
    const commitMessage: CommitMessage = {
      header: 'invalid(scope): add new feature',
      body: ['This is a valid body paragraph.'],
      footer: 'close #123',
      hasBody: true,
      hasFooter: true,
    };

    validate(commitMessage);

    expect(core.setFailed).toHaveBeenCalledWith('Invalid type: invalid');
  });

  it('should fail for invalid scope', () => {
    const commitMessage: CommitMessage = {
      header: 'feat(invalid scope): add new feature',
      body: ['This is a valid body paragraph.'],
      footer: 'close #123',
      hasBody: true,
      hasFooter: true,
    };

    validate(commitMessage);

    expect(core.setFailed).toHaveBeenCalledWith('Invalid scope: invalid scope');
  });

  it('should fail for invalid subject', () => {
    const commitMessage: CommitMessage = {
      header:
        'feat(scope):  Invalid subject and too long long long long long long long long long long long long long long long long long long long long.',
      body: ['This is a valid body paragraph.'],
      footer: 'close #123',
      hasBody: true,
      hasFooter: true,
    };

    validate(commitMessage);

    expect(core.setFailed).toHaveBeenCalledWith(
      'Subject should not start with an uppercase letter:  Invalid subject and too long long long long long long long long long long long long long long long long long long long long.',
    );
    expect(core.setFailed).toHaveBeenCalledWith(
      'Subject should not end with a period:  Invalid subject and too long long long long long long long long long long long long long long long long long long long long.',
    );
    expect(core.setFailed).toHaveBeenCalledWith(
      'Subject is too long:  Invalid subject and too long long long long long long long long long long long long long long long long long long long long.',
    );
    expect(core.setFailed).toHaveBeenCalledWith(
      'Subject should not start or end with a space:  Invalid subject and too long long long long long long long long long long long long long long long long long long long long.',
    );
  });

  it('should fail for invalid body', () => {
    const commitMessage: CommitMessage = {
      header: 'feat(scope): add new feature',
      body: [
        ' invalid body paragraph.',
        'Long long long long long long long long long long long long long long long long long long long long long',
      ],
      footer: 'close #123',
      hasBody: true,
      hasFooter: true,
    };

    validate(commitMessage);

    expect(core.setFailed).toHaveBeenCalledWith(
      'Body paragraph should start with an uppercase letter:  invalid body paragraph.',
    );
    expect(core.setFailed).toHaveBeenCalledWith(
      'Body line should not start or end with a space:  invalid body paragraph.',
    );
    expect(core.setFailed).toHaveBeenCalledWith(
      'Body line is too long: Long long long long long long long long long long long long long long long long long long long long long',
    );
  });

  it('should fail for invalid footer', () => {
    const commitMessage: CommitMessage = {
      header: 'feat(scope): add new feature',
      body: ['This is a valid body paragraph.'],
      footer: 'invalid footer',
      hasBody: true,
      hasFooter: true,
    };

    validate(commitMessage);

    expect(core.setFailed).toHaveBeenCalledWith(
      'Invalid footer: invalid footer',
    );
  });
});
