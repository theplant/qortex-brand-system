<script setup lang="ts">
import { useSlideContext, useNav } from "@slidev/client";
const { $frontmatter } = useSlideContext();
const { currentPage, total } = useNav();
const docCode = ($frontmatter as any)?.docCode || "QX-SALES-01";
const docClass = ($frontmatter as any)?.docClass || "Confidential · Draft";
const tagline = ($frontmatter as any)?.tagline || "Move faster. Lead in Japan.";
const sectionNum = ($frontmatter as any)?.sectionNum || "—";
const section = ($frontmatter as any)?.section || "Content";
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

    <main class="qx-quote-body">
      <div class="qx-quote-mark">
        <span class="qx-quote-mark__glyph">❝</span>
        <span class="qx-quote-mark__label">Position</span>
      </div>
      <div class="qx-quote-content">
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
.qx-quote-body {
  padding: 56px 80px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  min-height: 0;
  position: relative;
}
.qx-quote-mark {
  display: flex;
  align-items: baseline;
  gap: 24px;
}
.qx-quote-mark__glyph {
  font-family: var(--font-display);
  font-size: 120px;
  color: var(--accent);
  line-height: 0.7;
}
.qx-quote-mark__label {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ink-3);
  padding-left: 20px;
  border-left: 1px solid var(--rule);
}
[lang="ja"] .qx-quote-mark__label { letter-spacing: 0.08em; text-transform: none; }
.qx-quote-content blockquote {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 70px;
  line-height: 1.15;
  color: var(--ink);
  margin: 0;
  padding: 0;
  border: none;
  letter-spacing: -0.02em;
  max-width: 1500px;
}
.qx-quote-content blockquote em {
  font-style: italic;
  color: var(--accent-strong);
}
[lang="ja"] .qx-quote-content blockquote {
  font-family: var(--font-jp);
  font-style: normal;
  font-size: 58px;
  letter-spacing: 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.qx-quote-content p:not(:first-of-type),
.qx-quote-content .author {
  font-family: var(--font-body);
  font-size: 22px;
  color: var(--ink-3);
  margin: 36px 0 0;
  padding-top: 24px;
  border-top: 1px solid var(--rule);
  max-width: 1100px;
  font-weight: 500;
}
.qx-quote-content p:not(:first-of-type) b,
.qx-quote-content .author b {
  color: var(--ink);
  font-weight: 600;
}
</style>
