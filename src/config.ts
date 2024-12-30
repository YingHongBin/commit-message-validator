import {
  FOOTER_PATTERN,
  HEADER_PATTERN,
  MERGE_PATTERN,
  REVERT_PATTERN,
  VALID_TYPES,
} from './constants';
import {ISetting} from './settings';

export interface IHeaderConfig {
  headerPattern: RegExp;
  scopeValues: string[];
  mergePattern: RegExp;
  revertPattern: RegExp;
  validTypes: string[];
}

export interface IConfig {
  headerConfig: IHeaderConfig;
  footerPattern: RegExp;
}

export function getConfig(setting: ISetting): IConfig {
  const headerConfig = {} as IHeaderConfig;
  headerConfig.headerPattern = HEADER_PATTERN;
  if (setting.scopeValues.length > 0) {
    headerConfig.scopeValues = [...setting.scopeValues, '*'];
  } else {
    headerConfig.scopeValues = [];
  }
  headerConfig.mergePattern = MERGE_PATTERN;
  headerConfig.revertPattern = REVERT_PATTERN;
  headerConfig.validTypes = VALID_TYPES;
  const config = {} as IConfig;
  config.headerConfig = headerConfig;
  config.footerPattern = FOOTER_PATTERN;
  return config;
}
