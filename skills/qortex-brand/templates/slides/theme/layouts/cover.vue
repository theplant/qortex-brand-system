<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext, useNav } from "@slidev/client";
const { $slidev, $frontmatter } = useSlideContext();
const { currentPage, total } = useNav();
const docCode = ($frontmatter as any)?.docCode || "QX-SALES-01";
const docClass = ($frontmatter as any)?.docClass || "Confidential · Draft";
const tagline = ($frontmatter as any)?.tagline || "Move faster. Lead in Japan.";
const mark = ($frontmatter as any)?.mark || "01";
const markLabel = ($frontmatter as any)?.markLabel || "The brief";
const isJa = computed(() => ($slidev as any)?.configs?.htmlAttrs?.lang === "ja");
const L = computed(() => isJa.value
  ? { docPrefix: "Document", preparedFor: "送付先", preparedBy: "作成", dateVersion: "日付 · バージョン", runtime: "想定読了時間" }
  : { docPrefix: "Document", preparedFor: "Prepared for", preparedBy: "Prepared by", dateVersion: "Date · Version", runtime: "Estimated reading" });
</script>

<template>
  <div class="qx-doc">
    <header class="qx-dochead">
      <div class="qx-dochead__brand">QORTEX</div>
      <div class="qx-dochead__crumbs">
        <span>{{ $frontmatter?.docTitle || 'Sales briefing' }}</span>
        <span><b>{{ $frontmatter?.docVolume || 'Volume 01' }}</b></span>
        <span>{{ $frontmatter?.docSubtitle || 'The QORTEX offering' }}</span>
      </div>
      <div class="qx-dochead__class">
        Document {{ docCode }}
        <b>{{ docClass }}</b>
      </div>
    </header>

    <main class="qx-cover-body">
      <div class="qx-cover-main">
        <div class="qx-eyebrow">
          <span class="qx-eyebrow__num">{{ mark }}</span>
          <span>{{ markLabel }}</span>
        </div>
        <div class="qx-cover-body__content">
          <slot />
        </div>
      </div>
      <aside class="qx-cover-meta">
        <slot name="meta">
          <div class="qx-cover-meta__group">
            <h6>{{ L.preparedFor }}</h6>
            <p>{{ $frontmatter?.preparedFor || 'Sales committee' }}<i>{{ $frontmatter?.preparedForNote || 'Tokyo & Osaka regional teams' }}</i></p>
          </div>
          <div class="qx-cover-meta__rule"></div>
          <div class="qx-cover-meta__group">
            <h6>{{ L.preparedBy }}</h6>
            <p>{{ $frontmatter?.preparedBy || 'QORTEX team' }}<i>{{ $frontmatter?.preparedByNote || 'Solutions & brand' }}</i></p>
          </div>
          <div class="qx-cover-meta__rule"></div>
          <div class="qx-cover-meta__group">
            <h6>{{ L.dateVersion }}</h6>
            <p>{{ $frontmatter?.date || 'November 2026' }}<i>{{ $frontmatter?.version || 'v 1.0 · draft for circulation' }}</i></p>
          </div>
          <div class="qx-cover-meta__rule"></div>
          <div class="qx-cover-meta__group">
            <h6>{{ L.runtime }}</h6>
            <p>{{ $frontmatter?.runtime || '22 minutes' }}<i>{{ $frontmatter?.runtimeNote || '20 slides · 4 exhibits' }}</i></p>
          </div>
        </slot>
      </aside>
    </main>

    <footer class="qx-docfoot">
      <div class="qx-docfoot__left">
        <span>{{ docCode }}</span>
        <span><b>§ {{ mark }}</b> · {{ markLabel }}</span>
      </div>
      <div class="qx-docfoot__center">{{ tagline }}</div>
      <div class="qx-docfoot__page">{{ String(currentPage).padStart(2,'0') }} <span>/</span> {{ String(total).padStart(2,'0') }}</div>
    </footer>
  </div>
</template>

<style>
.qx-cover-body {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 64px;
  align-items: stretch;
  padding: 28px 80px 24px;
  min-height: 0;
}
.qx-cover-main {
  display: flex;
  flex-direction: column;
  padding-right: 32px;
  border-right: 1px solid var(--rule);
  min-width: 0;
}
.qx-cover-main .qx-eyebrow { margin-bottom: 28px; }
.qx-cover-body__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 0;
}
.qx-cover-body__content h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 110px;
  line-height: 0.96;
  letter-spacing: -0.04em;
  color: var(--ink);
  margin: 0;
}
.qx-cover-body__content h1 em {
  font-style: italic;
  color: var(--accent-strong);
  font-weight: 800;
}
.qx-cover-body__content > p {
  font-family: var(--font-display);
  font-weight: 400;
  font-style: italic;
  font-size: 28px;
  line-height: 1.3;
  color: var(--ink-2);
  margin: 0;
  max-width: 1000px;
}
.qx-cover-body__content > p strong,
.qx-cover-body__content > p b {
  color: var(--ink);
  font-style: normal;
  font-weight: 600;
}
.qx-cover-body__content > ul {
  background: var(--paper-2);
  border-left: 4px solid var(--accent);
  padding: 22px 28px 24px;
  margin-top: auto;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.qx-cover-body__content > ul {
  counter-reset: covlist;
}
.qx-cover-body__content > ul li {
  position: relative;
  padding: 0 0 0 34px;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
  color: var(--ink-2);
  counter-increment: covlist;
}
.qx-cover-body__content > ul li::before {
  content: counter(covlist, lower-roman);
  position: absolute;
  left: 0;
  top: 4px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  color: var(--accent-strong);
  letter-spacing: 0.04em;
}
.qx-cover-body__content > ul li b,
.qx-cover-body__content > ul li strong {
  color: var(--ink);
  font-weight: 600;
}
[lang="ja"] .qx-cover-body__content h1 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 92px;
  letter-spacing: 0;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-cover-body__content > p {
  font-family: var(--font-jp);
  font-style: normal;
  font-size: 26px;
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.qx-cover-meta {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-left: 16px;
}
.qx-cover-meta__group h6 {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ink-4);
  margin: 0 0 6px;
}
[lang="ja"] .qx-cover-meta__group h6 { letter-spacing: 0.08em; text-transform: none; }
.qx-cover-meta__group p {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  color: var(--ink);
  margin: 0;
  line-height: 1.4;
}
.qx-cover-meta__group p i {
  display: block;
  font-style: normal;
  font-size: 12px;
  color: var(--ink-3);
  font-weight: 400;
  margin-top: 2px;
}
.qx-cover-meta__rule {
  height: 1px;
  background: var(--rule);
  margin: 0 -8px;
}
</style>
