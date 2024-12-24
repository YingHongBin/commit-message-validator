import * as core from '@actions/core';

class CommitMessage {
  header: string;
  body: string[] | null;
  hasBody: boolean = true;
  footer: string | null;
  hasFooter: boolean = true;

  constructor(header: string, body: string[] | null, footer: string | null) {
    this.header = header;
    this.body = body;
    if (body === null) {
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
  if (sections.length === 1) {
    return new CommitMessage(sections[0], null, null);
  } else {
    const section = sections[sections.length - 1];
    if (section.startsWith('close') || section.startsWith('fix')) {
      const paragraph = sections.slice(1, sections.length - 1);
      return new CommitMessage(sections[0], paragraph, section);
    } else {
      return new CommitMessage(sections[0], sections.slice(1), null);
    }
  }
}

export {parseMessage, CommitMessage};
