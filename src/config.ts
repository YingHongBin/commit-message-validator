import {
  FOOTER_PATTERN,
  HEADER_PATTERN,
  MERGE_PATTERN,
  SCOPE_PATTERN,
  REVERT_PATTERN,
  VALID_TYPES,
} from './constants';

export interface IHeaderConfig {
  headerPattern: RegExp;
  scopePattern: RegExp;
  mergePattern: RegExp;
  revertPattern: RegExp;
  validTypes: string[];
}

export interface IConfig {
  headerConfig: IHeaderConfig;
  footerPattern: RegExp;
}

export function getConfig(): IConfig {
  const headerConfig = {} as IHeaderConfig;
  headerConfig.headerPattern = HEADER_PATTERN;
  headerConfig.scopePattern = SCOPE_PATTERN;
  headerConfig.mergePattern = MERGE_PATTERN;
  headerConfig.revertPattern = REVERT_PATTERN;
  headerConfig.validTypes = VALID_TYPES;
  const config = {} as IConfig;
  config.headerConfig = headerConfig;
  config.footerPattern = FOOTER_PATTERN;
  return config;
}
