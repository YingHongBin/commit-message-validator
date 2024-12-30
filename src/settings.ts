import * as core from '@actions/core';

export interface ISetting {
  scopeValues: string[];
}

export function getSetting(): ISetting {
  const setting = {} as ISetting;
  const input: string | undefined = core.getInput('scope-values');
  setting.scopeValues = input ? input.split(',').map(scope => scope.trim()) : [];
  return setting;
}
