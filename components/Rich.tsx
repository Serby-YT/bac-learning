import { Fragment, type ReactNode } from "react";
import katex from "katex";

// Lesson text: **bold** and $inline math$ (KaTeX). Rendered to HTML strings, so
// it works the same on the server and in the browser.

function Math({ tex }: { tex: string }) {
  const html = katex.renderToString(tex, { throwOnError: false, output: "html", strict: false });
  return <span className="math" dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Math pieces inside a run of plain text. */
function WithMath({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\$[^$]+\$)/g).map((part, i): ReactNode =>
        part.length > 2 && part.startsWith("$") && part.endsWith("$") ? (
          <Math key={i} tex={part.slice(1, -1)} />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

/** One line: bold and math, no paragraphs. For prompts, answers and short notes. */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i): ReactNode =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>
            <WithMath text={part.slice(2, -2)} />
          </strong>
        ) : (
          <WithMath key={i} text={part} />
        )
      )}
    </>
  );
}

/** Paragraphs split by a blank line. A paragraph wrapped in "$$" is a centred formula. */
export function Rich({ text, className = "lesson-body" }: { text: string; className?: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) =>
        para.startsWith("$$") && para.endsWith("$$") ? (
          <div
            key={i}
            className="math-block"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(para.slice(2, -2), {
                throwOnError: false,
                displayMode: true,
                strict: false,
              }),
            }}
          />
        ) : (
          <p key={i} className={className}>
            <Inline text={para} />
          </p>
        )
      )}
    </>
  );
}
