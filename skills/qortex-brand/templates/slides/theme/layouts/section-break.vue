<script setup lang="ts">
import { useSlideContext, useNav } from "@slidev/client";
const { $frontmatter } = useSlideContext();
const { currentPage, total } = useNav();
const docCode = ($frontmatter as any)?.docCode || "QX-SALES-01";
const docClass = ($frontmatter as any)?.docClass || "Confidential · Draft";
const tagline = ($frontmatter as any)?.tagline || "Move faster. Lead in Japan.";
const sectionNum = ($frontmatter as any)?.sectionNum || "§";
const section = ($frontmatter as any)?.section || "Section";
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

    <main class="qx-section-body">
      <div class="qx-section-mark">
        <span class="qx-section-mark__num">{{ String(sectionNum).padStart(2, '0') }}</span>
        <span class="qx-section-mark__label">Section · {{ section }}</span>
      </div>
      <div class="qx-section-content">
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
.qx-section-body {
  padding: 56px 80px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  position: relative;
}
.qx-section-body::before {
  content: "";
  position: absolute;
  left: 80px;
  right: 80px;
  top: 56px;
  height: 1px;
  background: var(--rule);
}
.qx-section-mark {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 36px;
}
.qx-section-mark__num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 180px;
  line-height: 0.85;
  color: var(--accent-strong);
  letter-spacing: -0.06em;
}
.qx-section-mark__label {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ink-3);
  padding-left: 24px;
  border-left: 1px solid var(--rule);
  align-self: stretch;
  display: flex;
  align-items: center;
  max-width: 280px;
}
[lang="ja"] .qx-section-mark__label { letter-spacing: 0.08em; text-transform: none; }

.qx-section-content { display: flex; flex-direction: column; gap: 18px; max-width: 1500px; }
.qx-section-content h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 88px;
  line-height: 1.0;
  letter-spacing: -0.035em;
  color: var(--ink);
  margin: 0 0 16px;
}
.qx-section-content h1 em {
  font-style: italic;
  color: var(--accent-strong);
  font-weight: 800;
}
.qx-section-content p {
  font-family: var(--font-display);
  font-weight: 400;
  font-style: italic;
  font-size: 28px;
  line-height: 1.3;
  color: var(--ink-2);
  margin: 0;
  max-width: 1300px;
}
.qx-section-content p strong, .qx-section-content p b {
  color: var(--ink);
  font-weight: 600;
  font-style: normal;
}
[lang="ja"] .qx-section-content h1 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 76px;
  letter-spacing: 0;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-section-content p {
  font-family: var(--font-jp);
  font-style: normal;
  font-size: 26px;
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
</style>
