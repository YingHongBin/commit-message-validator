import {FOOTER_PATTERN, MERGE_PATTERN, REVERT_PATTERN} from './constants';

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
  console.log(sections[0]);
  const footerCandidate = sections[sections.length - 1];
  if (MERGE_PATTERN.test(sections[0]) || REVERT_PATTERN.test(sections[0])) {
    return new CommitMessage(sections[0], [], null);
  } else if (FOOTER_PATTERN.test(footerCandidate) && sections.length > 1) {
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
