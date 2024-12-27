export const VALID_TYPES: string[] = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'chore',
];

// header must be in the format: <type>(<scope>): <subject>
// (<scope>) is optional
export const HEADER_PATTERN: RegExp = /^(.+?)(?:\((.+)\))?: (.+)$/;
// scope can be any alphanumeric string or *
export const SCOPE_PATTERN: RegExp = /^[A-Za-z0-9]+$|^\*$/;
// merge commit must be in the format: Merge pull request #<number> from <branch>
export const MERGE_PATTERN: RegExp = /^Merge pull request #[0-9]+ from .+$/;
// footer must begin with keywords close or fix followed by a space and then #{issue_number}
// multiple issues can be separated by commas like close #123, fix #456
export const FOOTER_PATTERN: RegExp = /^((close|fix) #[0-9]+)(, (close|fix) #[0-9]+)*$/;
// revert commit must be in the format: Revert "<commit_header>"
export const REVERT_PATTERN: RegExp = /^Revert ".+"$/;
