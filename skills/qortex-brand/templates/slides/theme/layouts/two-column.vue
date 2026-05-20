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

    <main class="qx-twocol-body">
      <div v-if="exhibit" class="qx-exhibit">
        <span class="qx-exhibit__tag">EXHIBIT {{ exhibit }}</span>
        <span class="qx-exhibit__title" v-html="exhibitTitle"></span>
        <span class="qx-exhibit__meta" v-html="exhibitMeta"></span>
      </div>

      <div class="qx-twocol">
        <div class="qx-twocol__col qx-prose">
          <slot name="left" />
        </div>
        <div class="qx-twocol__col qx-twocol__col--right qx-prose">
          <slot name="right" />
          <slot />
        </div>
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
.qx-twocol-body {
  padding: 36px 80px 28px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-height: 0;
  overflow: hidden;
}
.qx-twocol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  flex: 1;
  min-height: 0;
}
.qx-twocol__col {
  padding: 0 36px;
}
.qx-twocol__col:first-child {
  padding-left: 0;
  border-right: 1px solid var(--rule);
}
.qx-twocol__col--right {
  background: var(--paper-2);
  margin-right: -32px;
  padding: 0 36px;
}
.qx-twocol__col h2 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 44px;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--ink);
  margin: 0 0 16px;
}
.qx-twocol__col h2 em { font-style: italic; color: var(--accent-strong); font-weight: 800; }
.qx-twocol__col h3 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  color: var(--ink);
  letter-spacing: -0.01em;
  margin: 16px 0 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid var(--ink);
}
.qx-twocol__col p {
  font-family: var(--font-body);
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 0 0 12px;
}
.qx-twocol__col p strong { color: var(--ink); font-weight: 600; }
.qx-twocol__col p em { color: var(--accent-strong); font-style: italic; }
.qx-twocol__col ul, .qx-twocol__col ol {
  list-style: none;
  padding: 0;
  margin: 6px 0 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.qx-twocol__col ul li, .qx-twocol__col ol li {
  position: relative;
  padding: 4px 0 4px 28px;
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.5;
  color: var(--ink-2);
}
.qx-twocol__col ul li::before {
  content: "■";
  position: absolute;
  left: 0;
  top: 8px;
  color: var(--accent-strong);
  font-size: 10px;
  line-height: 1;
}
.qx-twocol__col ol { counter-reset: tcol-num; }
.qx-twocol__col ol li { counter-increment: tcol-num; }
.qx-twocol__col ol li::before {
  content: counter(tcol-num, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 7px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  color: var(--accent-strong);
  line-height: 1;
}
.qx-twocol__col li b, .qx-twocol__col li strong { color: var(--ink); font-weight: 600; }
[lang="ja"] .qx-twocol__col h2 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 38px;
  letter-spacing: 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-twocol__col h3 { font-family: var(--font-jp); letter-spacing: 0; }
[lang="ja"] .qx-twocol__col p, [lang="ja"] .qx-twocol__col li {
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
</style>
