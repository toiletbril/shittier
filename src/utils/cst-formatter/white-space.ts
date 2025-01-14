import { Token } from 'cst';

function addInconsistentIndentation(code: string) {
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const text = lines[i].trim();

    if (text !== '') {
      const indentation = getRandomWhitespace();
      lines[i] = indentation + text;
    }
  }
  return lines.join('\n');
}

function addRandomWhiteSpace(code: any) {
  code.selectTokensByType('Punctuator').forEach((token: any) => {
    try {
      const randomWhitespaceBefore = getRandomWhitespace();
      const randomCommentBlockBefore = getRandomCommentBlocks();
      const prevToken = token.getPreviousToken();
      if (prevToken.isWhitespace) {
        prevToken.value = randomWhitespaceBefore;
        prevToken._sourceCode = randomWhitespaceBefore;
        prevToken._sourceCodeLines = [randomWhitespaceBefore];
      } else {
        const shouldUseComments = (Math.random() <= 0.1);
        let distractionBefore = (shouldUseComments)
          ? new Token(
            'CommentBlock',
            randomCommentBlockBefore
          )
          : new Token(
            'Whitespace',
            randomWhitespaceBefore
          );
        token.parentElement.insertChildBefore(distractionBefore, token);
      }
    } catch (err) {
      // TODO: Handle token errors
      // console.log(err);
    }
  });
}

function getRandomWhitespace() {
  const whitespaceOptions = [' ', '  ', '\t', '\t\t', '\t '];
  const randomIndex = Math.floor(Math.random() * whitespaceOptions.length);
  return whitespaceOptions[randomIndex];
}

function getRandomCommentBlocks() {
  const commentOptions = [
    ':3c',
    'T__T',
    'yikes',
    'Hard to explain',
    'Big loop of doom',
    'drunk, fix later',
    'Biblical reference',
    'Comment this later',
    'Autogenerated, do not edit.',
    'it just keeps getting worse',
    'This comment is self explanatory.',
    'evil floating point bit level hacking',
    'the following code is self-documenting',
    'You are not expected to understand this',
    'this is a violation of the Geneva Convention',
    'If this comment is removed the program will blow up',
    'sometimes I believe the compiler ignores all my comments',
    'trying to reinvent the wheel but it\'s coming out more like a square',
  ];
  const randomIndex = Math.floor(Math.random() * commentOptions.length);
  return ' ' + commentOptions[randomIndex] + ' ';
}

export { addInconsistentIndentation, addRandomWhiteSpace };
