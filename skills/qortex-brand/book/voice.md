# QORTEX voice

Voice is encoded as **specimens + anti-specimens**, not as adjective lists. Pattern-match against the real QORTEX sentences below before generating copy.

v1 seeds the `Headlines` section only. Subsequent issues add `Subheads`, `Paragraphs`, `CTAs`, `Eyebrows`, and `Microcopy` using the same shape.

## How to use this file

For each move (headline, subhead, …), there is a `### Specimens` block and a `### Anti-specimens` block.

- **Specimens** are real QORTEX sentences captured verbatim from qortex.com. Do not paraphrase them; pattern-match against them.
- **Anti-specimens** are written to sound like generic enterprise SaaS copy that a QORTEX draft must *not* drift toward. They are the strawman — if your draft sounds closer to the anti-specimen than the specimen, rewrite.

Common moves you'll see across the specimens:

- Two beats per line — a declarative statement, then a counterpoint or amplifier, often separated by a period mid-line. "Japan-first. Intelligent commerce."
- Short. Often a sentence fragment.
- Concrete nouns over abstract gerunds. "commerce", "team", "brands" — not "solutions", "experiences", "ecosystems".
- One adjective max. Often zero.
- The emphasised phrase italicises a noun phrase, not a verb. "Japan-first. _Intelligent commerce._"

## Headlines

### Specimens

1. Japan-first. _Intelligent commerce._
2. AI embedded where your team already works.
3. Designed together. _Shipped fast._

### Anti-specimens

1. Revolutionize your commerce with our cutting-edge AI-powered enterprise solution for the Japanese market.
2. Empowering teams to unlock seamless growth through next-generation intelligent automation.
3. We built a comprehensive platform that delivers innovative results, faster.

The contrast: every specimen is under 8 words and uses concrete nouns ("commerce", "team"). Every anti-specimen is over 12 words and leans on AI-marketing filler ("revolutionize", "cutting-edge", "seamless", "next-generation", "comprehensive"). If your draft contains any of those filler words, delete the sentence and start again.

### JP specimens (from qortex.com/jp/)

The JP headlines render the same two-beat structure as EN — a declarative statement, a period, then an amplifier — but use katakana for the emphasised concept rather than italics. The emphasis is set in `<em>` on web and rendered in cyan; on social and slides the same `<em>` reads as the cyan accent.

1. 日本ファースト。<em>インテリジェントコマース。</em>
2. 共に設計。<em>素早く公開。</em>
3. 次の可能性を、ご一緒に。

### JP anti-specimens

1. AI を活用した革新的なエンタープライズ商取引ソリューションで、お客様のビジネスを次のステージへ。
2. シームレスで包括的な体験を、業界最先端の技術で実現します。
3. 私たちが提供する次世代プラットフォームは、グローバル基準のイノベーションを日本市場へお届けします。

The same contrast holds in JP. The specimens use short noun phrases ending in 。, no filler katakana ("ソリューション" is fine as a concept noun in the eyebrow but not as a stand-alone selling word), and no aspirational verbs ("実現します", "お届けします"). When the JP draft starts to feel like a press release, rewrite — the brand voice in JP is closer to a product caption than a corporate announcement.

### JP-specific moves

- **Katakana for the emphasised noun phrase**, set in `<em>`. "<em>インテリジェントコマース。</em>", "<em>素早く公開。</em>". Avoid wrapping verbs in `<em>` — emphasis lands on the noun.
- **Comma-driven cadence**. The full-width `、` separates beats inside a clause; the full-width `。` ends a beat. Two-beat headlines use one `。` between the two parts: `日本ファースト。インテリジェントコマース。`
- **No negative letter-spacing on display**. JP characters carry their own tracking — tightening them produces a broken-glyph effect. See `../system/channels/social.md` for the per-channel rule.
- **`word-break: keep-all`, `overflow-wrap: anywhere`**. Standard for any JP display surface so JP wraps on phrase boundaries while embedded English brand names are allowed to wrap anywhere.
