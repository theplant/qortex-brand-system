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
const exhibitMeta = ($frontmatter as any)?.exhibitMeta || "Source: QORTEX internal · Nov 2026";
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

    <main class="qx-stat-body">
      <div v-if="exhibit" class="qx-exhibit">
        <span class="qx-exhibit__tag">EXHIBIT {{ exhibit }}</span>
        <span class="qx-exhibit__title" v-html="exhibitTitle"></span>
        <span class="qx-exhibit__meta" v-html="exhibitMeta"></span>
      </div>
      <div class="qx-stat-content">
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
.qx-stat-body {
  padding: 36px 80px 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  min-height: 0;
}
.qx-stat-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;
  flex: 1;
  min-height: 0;
}
.qx-stat-content h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 320px;
  line-height: 0.85;
  letter-spacing: -0.06em;
  color: var(--accent-strong);
  margin: 0;
}
.qx-stat-content h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--ink);
  margin: 0 0 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--ink);
}
.qx-stat-content h2 em { font-style: italic; color: var(--accent-strong); font-weight: 700; }
.qx-stat-content p {
  font-family: var(--font-body);
  font-size: 22px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 0 0 12px;
  max-width: 760px;
}
.qx-stat-content p strong, .qx-stat-content p b { color: var(--ink); font-weight: 600; }
.qx-stat-content ul {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.qx-stat-content ul li {
  position: relative;
  padding: 4px 0 4px 28px;
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.5;
  color: var(--ink-2);
}
.qx-stat-content ul li::before {
  content: "■";
  position: absolute;
  left: 0;
  top: 9px;
  color: var(--accent-strong);
  font-size: 10px;
  line-height: 1;
}
.qx-stat-content ul li b, .qx-stat-content ul li strong { color: var(--ink); font-weight: 600; }
[lang="ja"] .qx-stat-content h2 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 40px;
  letter-spacing: 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-stat-content p {
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
</style>
