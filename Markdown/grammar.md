# Markdown Grammar

The markdown grammar that I will use will be my transcription of the
syntax provided by [John Gruber
(DaringFireball)](http://daringfireball.net/projects/markdown/syntax).

There is a Markdown parser written in C that has a nice implementation
of the
[grammar](https://github.com/jgm/peg-markdown/blob/master/markdown_parser.leg)
written in [leg](http://piumarta.com/software/peg/).

This [code
block](https://github.com/vmg/sundown/blob/master/src/markdown.c#L713-L740)
from [Sundown](https://github.com/vmg/sundown) shows a rather simple and
elegant approach to being UTF-8 aware (that is, supporting the occurrence
of `&#xxxx;` in the given markdown document.

## Markdown Elements

### Paragraphs and Line Breaks

Any lines of consecutive text are grouped into a single paragraph
element. One or more empty lines after a line of text indicates a
break in the paragraph, resulting in a new paragraph.

Line breaks (\<br /\>) in Markdown must be declared explicitely by ending a
line in two or more spaces.

### Headers

You can make H1 using ===

    This is an H1
    =============

You can make H2 using ---

    This is an H2
    -------------

Additionally, headers can be achieved using hashes (#) in front of the
line that is the header. The number of hashes indicates the level of the
heading.

    # This is an H1
    ## This is an H2
    ### This is an H3
    #### This is an H4
    ##### This is an H5
    ###### This is an H6

You can optionally close this heading syntax like so:

    ## This is an H2 ##

### Blockquotes

Blockquotes in Markdown are similar to email because they use `>`. You can
either start each new line in the blockquote with a `>` (which is the
preferred style) or you can lazily just mark the first line of a paragraph
as a blockquote and the rest of the paragraph will follow suit.

    > This is a blockquote
    > that I am writing rigth now.

    > This is a blockquote
    only marked by the first line.

You can also nest things within blockquotes (such as more blockquotes and
lists).

    > This is a blockquote
    >
    > > Here is a quote from someone else....
    >
    > This is the end of a blockquote

    > This is a blockquote
    >
    > 1. List item 1
    > 2. List item 2
    >
    > End of blockquote

### Lists

Lists can be unordered or ordered.

There are three ways to create an unordered list, which are all equivalent:

    * First
    * Second
    * Third

    - First
    - Second
    - Third

    + First
    + Second
    + Third  

Ordered lists are created by using digits with periods (though the digits
used do not matter). The following create equivalent ordered lists:

    1. First
    2. Second
    3. Third

    1. First
    1. Second
    1. Third

    99. First
    52. Second
    75. Third

If the list items are separated by an empty line, then it will wrap the list
item content in paragraph tags:

    * Paragraph List Item 1

    * Paragraph List Item 2

Which produces:

    <ul>
        <li><p>Paragraph List Item 1</p></li>
        <li><p>Paragraph List Item 2</p></li>
    </ul>

List items can contain multiple paragraphs and you can also nest all kinds
of other blocks in list items including lists themselves:

    - Item 1
    - Item 2
        - Sub Item 1
        - Sub Item 2
    - Item 3

### Code Blocks

By indenting the content by 4 spaces or 1 tab, we can create a code block.

    This is a code block

### Horizontal Rules

You can create a horizontal rule (\<hr /\>) with any of the following:

    * * *

    ***

    *****
    
    - - -

    ----------------------------

### Links

There are two ways to incorporate links into your document.

### Emphasis

You can make spans of text italic or bold to add emphasis.

### Code

Using backticks (\`) will create an inline code span for the included text.

### Images

Similarly to links, images can be included in your document

### Automatic Links

This is a shortcut for injecting links automatically into your document.

### Backslash Escapes

Backslash can be used to escape any of Markdown's special characters.

## EBNF

The following is an attempt at the EBNF for Markdown's grammar:

    Document = Blocks | eof;
    Blocks = Block ( Emptys Blocks | eof );
    Emptys = empty { empty };
    Block = Paragraph | Header | Blockquote | List | Codeblock | HorizontalLine;
    Paragraph = String { String };
    Header = "#" H1 [ "#" ];
    H1 = "#" H2 [ "#" ] | Paragraph;
    H2 = "#" H3 [ "#" ] | Paragraph;
    H3 = "#" H4 [ "#" ] | Paragraph;
    H4 = "#" H5 [ "#" ] | Paragraph;
    H5 = "#" H6 [ "#" ] | Paragraph;
    H6 = Paragraph;
    Blockquote = 
    List = 
    Codeblock = 
    HorizontalLine = 
    Link = 
    Code = 
    Image = 
    AutoLink = "<" ( URL | EMAIL ) ">";
    Emphasize = Bold | Italic
    Bold = Asterik Asterik String Asterik Asterik |
            Underscore Underscore String Underscore Underscore;
    Italic = Asterik String Asterik |
                Underscore String Underscore;
    String = VisibleCharacter { VisibleCharacter } Newline;
    VisibleCharacter = Unicode | Others | Alphanum | Escaped |
    InlineWhitespace;
    Escaped = Backslash Special;
    Unicode = "&" Alphanum Alphanum Alphanum Alphanum ";";
    Alphanum = ( Alphabet | Digit );
    Alphabet = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" |
                "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" |
                "U" | "V" | "W" | "X" | "Y" | "Z" | "a" | "b" | "c" | "d" |
                "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" |
                "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" |
                "y" | "z";
    Number = NonZeroDigit { Digit };
    NonZeroDigit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    Digit = "0" | NonZeroDigit;
    Newline = "\n";
    InlineWhitespace = Tab | Space;
    Tab = "\t";
    Space = "\s";
    Whitespace = "\s" | "\t" | "\n" | "\r";
    Asterik = "*";
    Backslash = "\";
    Backtick = "`";
    Others = "@" | "$" | "%" | "^" | "&" | "?" | "'" | "," | ";" | ":";
    // the Special characters only need to be escaped in certain situations,
    // need to figure out how to describe this in the grammar.
    Special = "\" | "`" | "*" | "_" | "{" | "}" | "[" | "]" | "(" | ")" |
                "#" | "+" | "-" | "." | "!";
    // empty is an empty line, no characters on that line
    // eof is the end of the file, no more bits to read
