import * as core from '@actions/core';

class CommitMessage {
  header: string;
  body: string[];
  hasBody: boolean = true;
  footer: string | null;
  hasFooter: boolean = true;

  constructor(header: string, body: string[], footer: string | null) {
    this.header = header;
    this.body = body;
    if (body.length === 0) {
      this.hasBody = false;
    }
    this.footer = footer;
    if (footer === null) {
      this.hasFooter = false;
    }
  }
}

function parseMessage(message: string): CommitMessage {
  const sections: string[] = message.split('\n\n');
  const footerCandidate = sections[sections.length - 1];
  if (
    footerCandidate.startsWith('close') ||
    footerCandidate.startsWith('fix')
  ) {
    return new CommitMessage(
      sections[0],
      sections.slice(1, sections.length - 1),
      footerCandidate,
    );
  } else {
    return new CommitMessage(sections[0], sections.slice(1), null);
  }
}

export {parseMessage, CommitMessage};
