<script setup lang="ts">
import { useSlideContext, useNav } from "@slidev/client";
const { $frontmatter } = useSlideContext();
const { currentPage, total } = useNav();
const docCode = ($frontmatter as any)?.docCode || "QX-SALES-01";
const docClass = ($frontmatter as any)?.docClass || "Confidential · Draft";
const tagline = ($frontmatter as any)?.tagline || "Move faster. Lead in Japan.";
const sectionNum = ($frontmatter as any)?.sectionNum || "—";
const section = ($frontmatter as any)?.section || "Content";
const exhibit = ($frontmatter as any)?.exhibit;
const exhibitTitle = ($frontmatter as any)?.exhibitTitle;
const exhibitMeta = ($frontmatter as any)?.exhibitMeta || "Source: QORTEX product · Live, Nov 2026";
</script>

<template>
  <div class="qx-doc">
    <header class="qx-dochead">
      <div class="qx-dochead__brand">QORTEX</div>
      <div class="qx-dochead__crumbs">
        <span>{{ $frontmatter?.docTitle || 'Sales briefing' }}</span>
        <span><b>§ {{ sectionNum }}</b></span>
        <span>{{ section }}</span>
      </div>
      <div class="qx-dochead__class">
        Document {{ docCode }}
        <b>{{ docClass }}</b>
      </div>
    </header>

    <main class="qx-content-body">
      <div v-if="exhibit" class="qx-exhibit">
        <span class="qx-exhibit__tag">EXHIBIT {{ exhibit }}</span>
        <span class="qx-exhibit__title" v-html="exhibitTitle"></span>
        <span class="qx-exhibit__meta" v-html="exhibitMeta"></span>
      </div>

      <div class="qx-prose qx-content-prose">
        <slot />
      </div>
    </main>

    <footer class="qx-docfoot">
      <div class="qx-docfoot__left">
        <span>{{ docCode }}</span>
        <span><b>§ {{ sectionNum }}</b> · {{ section }}</span>
      </div>
      <div class="qx-docfoot__center">{{ tagline }}</div>
      <div class="qx-docfoot__page">{{ String(currentPage).padStart(2,'0') }} <span>/</span> {{ String(total).padStart(2,'0') }}</div>
    </footer>
  </div>
</template>

<style>
.qx-content-body {
  padding: 36px 80px 28px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-height: 0;
  overflow: hidden;
}
.qx-content-prose {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: var(--font-body);
  max-width: none;
}
.qx-content-prose h2 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 56px;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin: 0 0 12px;
}
.qx-content-prose h2 em {
  font-style: italic;
  color: var(--accent-strong);
  font-weight: 800;
}
.qx-content-prose h3 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin: 18px 0 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--ink);
}
.qx-content-prose p {
  font-family: var(--font-body);
  font-size: 20px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 0 0 12px;
  max-width: 1300px;
}
.qx-content-prose p strong { color: var(--ink); font-weight: 600; }
.qx-content-prose p em { color: var(--accent-strong); font-style: italic; }
.qx-content-prose ul, .qx-content-prose ol {
  list-style: none;
  padding: 0;
  margin: 8px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.qx-content-prose ul li, .qx-content-prose ol li {
  position: relative;
  padding: 4px 0 4px 32px;
  font-family: var(--font-body);
  font-size: 19px;
  line-height: 1.5;
  color: var(--ink-2);
}
.qx-content-prose ul li::before {
  content: "■";
  position: absolute;
  left: 0;
  top: 8px;
  color: var(--accent-strong);
  font-size: 11px;
  line-height: 1;
}
.qx-content-prose ol { counter-reset: ol-num; }
.qx-content-prose ol li { counter-increment: ol-num; }
.qx-content-prose ol li::before {
  content: counter(ol-num, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 7px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  color: var(--accent-strong);
  letter-spacing: 0;
  line-height: 1;
}
.qx-content-prose li b, .qx-content-prose li strong { color: var(--ink); font-weight: 600; }
.qx-content-prose ul ul, .qx-content-prose ol ul {
  margin: 4px 0 4px;
}
.qx-content-prose ul ul li, .qx-content-prose ol ul li {
  font-size: 16px;
  color: var(--ink-3);
  padding-left: 24px;
}
.qx-content-prose ul ul li::before {
  content: "–";
  color: var(--ink-4);
  font-size: 14px;
  top: 6px;
}
.qx-content-prose blockquote {
  margin: 18px 0;
  padding-left: 24px;
  border-left: 4px solid var(--accent);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.3;
  color: var(--ink);
  max-width: 1300px;
}
.qx-content-prose blockquote em { color: var(--accent-strong); font-style: italic; }
[lang="ja"] .qx-content-prose blockquote { font-family: var(--font-jp); font-style: normal; line-height: 1.6; }
[lang="ja"] .qx-content-prose h2 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 48px;
  letter-spacing: 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-content-prose h3 {
  font-family: var(--font-jp);
  font-weight: 700;
  letter-spacing: 0;
}
[lang="ja"] .qx-content-prose p, [lang="ja"] .qx-content-prose li {
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
</style>
