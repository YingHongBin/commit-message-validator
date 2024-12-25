import {parseMessage, CommitMessage} from './commitMessage';
import * as core from '@actions/core';

/**
 * validate given type belongs to the types specified in the guidelines
 *
 * @param type given type to validate
 */
function validateType(type: string): void {
  core.debug(`${type}`);
  const types = [
    'feat',
    'fix',
    'docs',
    'style',
    'refactor',
    'perf',
    'test',
    'chore',
  ];
  if (!types.includes(type)) {
    core.setFailed(`Invalid type: ${type}`);
  }
}

/**
 * validate given scope belongs to the scopes specified in the config
 * or is a wildcard which means change affects more than a single scope
 *
 * @param scope given scope to validate
 */
function validateScope(scope: string | undefined): void {
  if (scope === undefined) {
    return;
  }
  // TODO: define scopes in the config
  const scopePattern = /^[A-Za-z0-9]+$|^\*$/;
  if (!scopePattern.test(scope)) {
    core.setFailed(`Invalid scope: ${scope}`);
  }
}

/**
 * validate given subject follows the rules specified in the guidelines
 *
 * @param subject given subject to validate
 */
function validateSubject(subject: string): void {
  core.debug(`${subject}`);
  // subject should be less than 80 characters
  if (subject.length > 80) {
    core.setFailed(`Subject is too long: ${subject}`);
  }
  // subject should not start or end with a space
  if (subject.startsWith(' ') || subject.endsWith(' ')) {
    core.setFailed(`Subject should not start or end with a space: ${subject}`);
  }
  // subject should not start with an uppercase letter
  if (subject.trim()[0] === subject.trim()[0].toUpperCase()) {
    core.setFailed(
      `Subject should not start with an uppercase letter: ${subject}`,
    );
  }
  // subject should not end with a period
  if (subject.trim().endsWith('.')) {
    core.setFailed(`Subject should not end with a period: ${subject}`);
  }
}

/**
 * validate given header follows the format <type>(<scope>): <subject>
 * and validate the type, scope and subject
 *
 * note: scope is optional
 *
 * @param header given header to validate
 */
function validateHeader(header: string): void {
  const headerPattern = /^(.+?)(?:\((.+)\))?: (.+)$/;
  const match = header.match(headerPattern);
  if (!match) {
    core.setFailed(`Invalid header: ${header}`);
    return;
  } else {
    const [, type, scope, subject] = match;
    core.debug(`Type: ${type}, scope: ${scope}, subject: ${subject}`);
    validateType(type);
    validateScope(scope);
    validateSubject(subject);
  }
}

/**
 * validate given body follows the rules specified in the guidelines
 *
 * @param body given body to validate
 */
function validateBody(body: string[]): void {
  body.forEach(paragraph => {
    if (paragraph.trim()[0] !== paragraph.trim()[0].toUpperCase()) {
      core.setFailed(
        `Body paragraph should start with an uppercase letter: ${paragraph}`,
      );
    }
    paragraph.split('\n').forEach(line => {
      if (line.startsWith(' ') || line.endsWith(' ')) {
        core.setFailed(
          `Body line should not start or end with a space: ${line}`,
        );
      }
      if (line.trim().length > 100) {
        core.setFailed(`Body line is too long: ${line}`);
      }
    });
  });
}

/**
 * validate given footer follows the rules specified in the guidelines
 *
 * @param footer given footer to validate
 */
function validateFooter(footer: string): void {
  const footerPattern = /^((close|fix) #[0-9]+)(, (close|fix) #[0-9]+)*$/;
  footer.split('/').forEach(line => {
    if (!footerPattern.test(line)) {
      core.setFailed(`Invalid footer: ${line}`);
    }
  });
}

/**
 * validate given commit message follows the rules specified in the guidelines
 *
 * @param commitMessage given commit message
 */
export default function validate(commitMessage: CommitMessage): void {
  validateHeader(commitMessage.header);
  if (commitMessage.hasBody) {
    validateBody(commitMessage.body);
  }
  if (commitMessage.hasFooter) {
    validateFooter(commitMessage.footer);
  }
}